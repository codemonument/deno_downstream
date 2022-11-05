import { ProgressBar } from "../../dependencies/_progressbar.ts";

export type SimpleProgressCliRendererOptions = {
  /**
   * The title of the progressbar
   */
  title?: string;
};

const defaultOptions: SimpleProgressCliRendererOptions = {
  title: "downloading: ",
};

export function simpleProgressCliRenderer(
  options?: SimpleProgressCliRendererOptions,
) {
  // sanitize input options
  if (!options) {
    options = defaultOptions;
  } else {
    options = { ...defaultOptions, ...options };
  }

  const { title } = options;
  const progressBar = new ProgressBar({ title, total: 100 });

  return new WritableStream({
    start(_controller) {
      // do init logic, if needed
    },
    write(progress: string | number, _controller) {
      const completed = (typeof progress === "number")
        ? progress
        : Number.parseFloat(progress);
      progressBar.render(completed);
    },
    close() {
    },
    abort(reason) {
      console.log("Sink error:", reason);
    },
  });
}
