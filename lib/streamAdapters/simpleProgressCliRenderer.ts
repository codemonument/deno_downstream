import { ProgressBar } from "../_progressbar.ts";

export function simpleProgressCliRenderer() {
    const progressBar = new ProgressBar({ title: "downloading: ", total: 100 });

    return new WritableStream({
        start(_controller) {
          // do init logic, if needed
        },
        write(progress, _controller) {
          progressBar.render(Number.parseFloat(progress))
        },
        close() {
        },
        abort(reason) {
          console.log("Sink error:", reason);
        },
      }
}
