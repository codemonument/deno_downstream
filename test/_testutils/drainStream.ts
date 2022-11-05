/**
 * Concrete Problem: When Test does this:
 * ```
   const { closeStreams, fileStream, progressStream, contentLength } =
      await downstream(
        File50MB,
    );

    await closeStreams()
 * ```
 * => Deno is confused with execution order in these tests.
 *
 * => Test empties event loop before promises can resolve.
 * https://github.com/denoland/deno/issues/13146
 *
 * How to solve that: A Timeout per test, to make the runtime wait the specified amount of time!
 * Issue Thread for Solution (still open):
 * https://github.com/denoland/deno/issues/11133
 *
 * Quickfix: solve this with the `deadline` function => not working,
 * deadline function expects a Promise<T> which is not compatible with
 * (t: DenoTestContext) => void | Promise<void>
 *
 * Real Fix: Simply consume the open stream!!!!
 * => Therefore: This drainStream Function
 */

export async function drainStream(stream: ReadableStream): Promise<void> {
  await drainStreamToTempFile(stream);
}

/**
 * @param stream WARNING! Keeps chunks in memory!
 * => better use drainStreamToTempFile()!
 */
export async function drainStreamInMemory(
  stream: ReadableStream,
): Promise<void> {
  // Manual stream drainig technique
  const reader = stream.getReader();
  let chunk = await reader.read();
  while (chunk.done !== true) {
    // console.log(chunk);
    chunk = await reader.read();
  }
}

export async function drainStreamToTempFile(
  stream: ReadableStream,
): Promise<void> {
  const tempFilePath = await Deno.makeTempFile();
  const tempFile = await Deno.open(tempFilePath, { write: true });

  // Draining a stream to a temp file reduces memory usage on the deno test runner!
  await stream.pipeTo(tempFile.writable);

  // file closing not necessary, since pipeTo already closes the file
  // tempFile.close();
  await Deno.remove(tempFilePath);
}
