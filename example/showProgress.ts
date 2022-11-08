import { ProgressBar } from "@deps/_progressbar.ts";
import { downstream } from "@mod";
import { File100MB } from "@testutils/testfiles.ts";

const { progressStream, closeStreams } = await downstream(File100MB);
const progressEvents: string[] = [];
const progressBar = new ProgressBar({ title: "downloading: ", total: 100 });

for await (const progress of progressStream) {
  progressBar.render(Number.parseFloat(progress));
  progressEvents.push(progress);
}

await closeStreams();
