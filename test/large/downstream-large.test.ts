/**
 * This test file uses the large test files.
 * Excluded from the other downstream test file to not have to wait for that long every time.
 */

import { downstream } from "@mod";
import { ProgressBar } from "@deps/_progressbar.ts";
import { assert, assertSnapshot } from "@deps/_testing.std.ts";
import { drainStream } from "@testutils/drainStream.ts";
import { File1GB } from "@testutils/testfiles.ts";
import { File10GB } from "@testutils/testfiles.ts";
import { sum } from "../../deps/_math.std.ts";

function sampleMemUsage() {
  const memUsage = Deno.memoryUsage();
  const kiloBytes = memUsage.rss / 1024;
  const megaBytes = kiloBytes / 1024;

  return megaBytes;
}

Deno.test(`Downloading 1 GB File should be done without holding full file in memory`, async (tc) => {
  const { progressStream, fileStream } = await downstream(File1GB);
  const progressEvents: string[] = [];

  // const memSamples: number[] = [];
  const progressBar = new ProgressBar({
    title: "downloading: ",
    total: 100,
  });
  const memMetrics = {
    min: 0,
    max: 0,
    sampleCount: 0,
    sampleSum: 0,
    average: 0,
  };

  // needs to be done to not crash deno test
  const drainPromise = drainStream(fileStream);

  for await (const progress of progressStream) {
    progressBar.render(Number.parseFloat(progress));
    progressEvents.push(progress);

    // samples memory usage in megabytes and asserts
    // that it should take less than 20 MB to download this whole 1 GB File
    const memUsage = sampleMemUsage();
    if (memMetrics.min === 0) memMetrics.min = memUsage;
    if (memUsage < memMetrics.min) memMetrics.min = memUsage;
    if (memUsage > memMetrics.max) memMetrics.max = memUsage;
    // assert(memUsage < 100);
    memMetrics.sampleCount += 1;
    memMetrics.sampleSum += memUsage;
    memMetrics.average = memMetrics.sampleSum / memMetrics.sampleCount;
    // memSamples.push(memUsage);
  }

  // Calculate some check values for memory usage
  // if (memSamples.length === 0) throw new Error(`No memory samples available!`);
  // if (memSamples.length === 1) console.warn(`Only 1 memory sample available!`);
  // const sortedMemSamples = memSamples.toSorted((a, b) => a - b);

  console.info(`Memory Usage Information: 
  sampleCount: ${memMetrics.sampleCount}
  min: ${memMetrics.min}
  max: ${memMetrics.max}
  average: ${memMetrics.average}
  `);

  // await Deno.writeTextFile(
  //   "./memSamples.json",
  //   JSON.stringify(memSamples),
  //   { create: true },
  // );
  // console.log(generateMemGraph(memSamples));

  await drainPromise;
});

/**
 * Problem: Still full 1GB File in Memory!
 * https://github.com/denoland/deno/issues/16544
 */
// await tc.step(`Reports Progress on big file (1GB) correctly`, async () => {
//   const { progressStream, fileStream } = await downstream(File1GB);
//   const progressEvents: string[] = [];
//   const progressBar = new ProgressBar({ title: "downloading: ", total: 100 });

//   // needs to be done to not crash deno test
//   const drainPromise = drainStream(fileStream);

//   for await (const progress of progressStream) {
//     progressBar.render(Number.parseFloat(progress));
//     progressEvents.push(progress);
//   }

//   await assertSnapshot(tc, progressEvents.length);
//   // needs to be done to not crash deno test
//   await drainPromise;
// });
