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
import { MemMetrics } from "@testutils/MemMetrics.ts";

Deno.test(`Downloading a 10 GB File should be possible and should not use RAM excessively`, async (tc) => {
  const { progressStream, fileStream } = await downstream(File1GB);
  const progressEvents: string[] = [];
  // const memSamples: number[] = [];
  const memMetrics = new MemMetrics();
  const progressBar = new ProgressBar({
    title: "downloading: ",
    total: 100,
  });

  // needs to be done to not crash deno test
  const drainPromise = drainStream(fileStream);

  for await (const progress of progressStream) {
    progressBar.render(Number.parseFloat(progress));
    progressEvents.push(progress);

    // samples memory usage in megabytes and calculates some memory metrics,
    // like the average memory usage
    memMetrics.sampleAndStore();
    // memSamples.push(memUsage);
  }

  memMetrics.log();

  // await Deno.writeTextFile(
  //   "./memSamples.json",
  //   JSON.stringify(memSamples),
  //   { create: true },
  // );
  // console.log(generateMemGraph(memSamples));

  await drainPromise;
});

Deno.test(`Downloading a 10 GB File should be possible and should not use RAM excessively`, async (tc) => {
  const { progressStream, fileStream } = await downstream(File10GB);
  const progressEvents: string[] = [];
  const memMetrics = new MemMetrics();
  const progressBar = new ProgressBar({
    title: "downloading: ",
    total: 100,
  });

  // needs to be done to not crash deno test
  const drainPromise = drainStream(fileStream);

  for await (const progress of progressStream) {
    progressBar.render(Number.parseFloat(progress));
    progressEvents.push(progress);

    // samples memory usage in megabytes and calculates some memory metrics,
    // like the average memory usage
    memMetrics.sampleAndStore();
  }

  memMetrics.log();

  await drainPromise;
});
