import { ProgressBar } from "../../deps/_progressbar.ts";

export async function drainProgressStream(stream: ReadableStream<string>) {
  const progressBar = new ProgressBar({
    title: "Draining Stream: ",
    total: 100,
  });

  for await (const progress of stream) {
    progressBar.render(Number.parseFloat(progress));
  }

  stream.cancel();
}
