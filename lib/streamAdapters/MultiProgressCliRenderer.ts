import { sleep } from "../../deps/sleep.ts";
import { MultiProgressBar } from "../../deps/_progressbar.ts";

export type MultiProgressState = Array<
  { text: string; completed: number; total: number }
>;

export type ProgressRow = {
  name: string;
  readableStream: ReadableStream<string> | ReadableStream<number>;
};

export function multiProgressCliRenderer() {
  const multibar = new MultiProgressBar({
    title: "Multi-Progress Bars",
    complete: "=",
    incomplete: "-",
    interval: 1,
    display: "[:bar] :text :percent :time :completed/:total",
  });

  return new WritableStream({
    start(_controller) {
      // do init logic, if needed
    },
    async write(state: MultiProgressState, _controller) {
      await sleep(0.002);
      multibar.render(state);
    },
    close() {
    },
    abort(reason) {
      console.error("Stream error:", reason);
    },
  });
}
