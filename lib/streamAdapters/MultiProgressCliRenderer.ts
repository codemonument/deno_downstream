import { MultiProgressBar } from "../../dependencies/_progressbar.ts";

/**
 * WritableStream Docs:
 * https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_writable_streams
 *
 * HIGHLY EXPERIMENTAL AND WORK IN PROGRESS!
 */
export class MultiProgressCliRenderer {
  public readonly writableStream = new WritableStream({
    start(_controller) {
      // do init logic, if needed
    },
    write(_chunk, _controller) {
    },
    close() {
    },
    abort(reason) {
      console.log("Sink error:", reason);
    },
  });

  public readonly bars;

  constructor(title: string) {
    this.bars = new MultiProgressBar({
      title,
      // clear: true,
      complete: "=",
      incomplete: "-",
      display: "[:bar] :text :percent :time :completed/:total",
    });
  }
}
