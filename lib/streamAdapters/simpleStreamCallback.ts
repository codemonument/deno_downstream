/**
 * The progress from the `downstream` function as string, in Percent with two digits after comma
 */
export type ChunkCallback<T> = (
  chunk: T,
) => void;

export function simpleStreamCallback<T>(
  progressCallback: ChunkCallback<T>,
): WritableStream {
  return new WritableStream({
    start(_controller) {
      // do init logic, if needed
    },
    write(_chunk, _controller) {
      progressCallback(_chunk);
    },
    close() {
    },
    abort(reason) {
      console.log("Sink error:", reason);
    },
  } //   , {
    //     highWaterMark: 3,
    //     size: () => 1,
    //   }
  );
}
