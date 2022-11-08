import { MultiProgressBar } from "../../dependencies/_progressbar.ts";
import { simpleCallbackTarget } from "@mod";

export type ProgressRow = {
  name: string;
  readableStream: ReadableStream<string> | ReadableStream<number>;
};

export type MultiProgressCliRendererOptions = {
  /**
   * All progress streams which should be shown on stdout
   */
  progressRows: ProgressRow[];
};

/**
 * WritableStream Docs:
 * https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_writable_streams
 *
 * HIGHLY EXPERIMENTAL AND WORK IN PROGRESS!
 */
export class MultiProgressCliRenderer {
  public readonly multibar = new MultiProgressBar({
    title: "Multi-Progress Bars",
    // clear: true,
    complete: "=",
    incomplete: "-",
    display: "[:bar] :text :percent :time :completed/:total",
  });

  progressRows: Array<ProgressRow>;

  progressState: Array<{ text: string; completed: number; total: number }> = [];

  constructor({ progressRows }: MultiProgressCliRendererOptions) {
    this.progressRows = progressRows;

    // setup progressState array
    progressRows.forEach((row, index) => {
      this.progressState[index] = { text: row.name, completed: 0, total: 100 };
    });

    progressRows.map(async (row, index) => {
      await row.readableStream.pipeTo(
        simpleCallbackTarget((progress: string | number) => {
          const completed = (typeof progress === "number")
            ? progress
            : Number.parseFloat(progress);
          this.progressState[index].completed = completed;
          this.multibar.render(this.progressState);
        }),
      );
    });
  }

  /**
   * @param name The name which should be shown for the progress bar
   */
  // getProgressWritable(name: string) {
  //   const bars = this.bars;
  //   return new WritableStream({
  //     start(_controller) {
  //       // do init logic, if needed
  //     },
  //     write(_chunk, _controller) {
  //       bars.render([]);
  //     },
  //     close() {
  //     },
  //     abort(reason) {
  //       console.log("Sink error:", reason);
  //     },
  //   });
  // }
}
