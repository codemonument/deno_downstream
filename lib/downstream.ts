import { DownstreamResponse } from "./DownstreamResponse.d.ts";
import { progressTransformer } from "./progressTransformer.ts";

/**
 * A function for downloading a file and returning a readable stream
 * allows to decouple downloading from further processing
 * (writing to file, sending to another network stream, etc.)
 *
 * CAUTION: These streams are currently buffered in memory!
 * I tested this with up to 1GB filesize, which does not crash,
 * but adds exactly this 1GB to the memory usage of the deno process using this function.
 *
 * Open issue: https://github.com/denoland/deno/issues/16544
 */
export async function downstream(
  input: string | Request,
  options?: RequestInit,
): Promise<DownstreamResponse> {
  /**
   * start file download stream
   */
  const fileResponse = await fetch(input, options);
  if (fileResponse.status < 200 || fileResponse.status >= 300) {
    // cleanup body stream!
    await fileResponse.body?.cancel();
    throw new Deno.errors.Http(
      `status ${fileResponse.status}-'${fileResponse.statusText}' received instead of 200`,
    );
  }

  const responseStream = fileResponse.body;
  if (!responseStream) {
    throw new Deno.errors.InvalidData(`The download response has no body!`);
  }

  const contentLength = Number.parseInt(
    fileResponse.headers.get("Content-Length") ?? "",
  );

  const [fileStream, fileStreamClone] = responseStream.tee();
  const progressStream = fileStreamClone.pipeThrough(
    progressTransformer({ maxBytes: contentLength }),
  );

  return {
    fileStream,
    contentLength,
    progressStream,
    closeStreams: async () => {
      await fileStream.cancel();
      await progressStream.cancel();
    },
  };
}
