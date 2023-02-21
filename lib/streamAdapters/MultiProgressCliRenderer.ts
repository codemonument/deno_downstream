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
    display: "[:bar] :text :percent :time :completed/:total",
  });

  return new WritableStream({
    start(_controller) {
      // do init logic, if needed
    },
    write(state: MultiProgressState, _controller) {
      multibar.render(state);
    },
    close() {
    },
    abort(reason) {
      console.error("Stream error:", reason);
    },
  });
}
