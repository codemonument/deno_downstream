/**
 * This test file uses the large test files.
 * Excluded from the other downstream test file to not have to wait for that long every time.
 */

import { downstream } from "@mod";
import { ProgressBar } from "@deps/_progressbar.ts";
import { assert, assertSnapshot } from "@deps/_testing.std.ts";
import { drainStream } from "@testutils/drainStream.ts";
import { File1GB } from "@testutils/testfiles.ts";
import { generateMemGraph } from "@testutils/generateMemGraph.ts";

function sampleMemUsage() {
  const memUsage = Deno.memoryUsage();
  const kiloBytes = memUsage.rss / 1024;
  const megaBytes = kiloBytes / 1024;

  return megaBytes;
}

Deno.test(`Downstream Large Tests`, async (tc) => {
  /**
   * Test this first to not have to wait for multiple 1 GB Downloads into memory
   */
  await tc.step(
    `Should consume less than 20 MB of memory when downloading 1 GB File`,
    async (tc) => {
      const { progressStream, fileStream } = await downstream(File1GB);
      const progressEvents: string[] = [];
      const memSamples: number[] = [];
      const progressBar = new ProgressBar({
        title: "downloading: ",
        total: 100,
      });

      // needs to be done to not crash deno test
      const drainPromise = drainStream(fileStream);

      for await (const progress of progressStream) {
        progressBar.render(Number.parseFloat(progress));
        progressEvents.push(progress);

        const memUsage = sampleMemUsage();
        assert(memUsage < 20);
        memSamples.push(memUsage);
      }

      await Deno.writeTextFile(
        "./memSamples.json",
        JSON.stringify(memSamples),
        { create: true },
      );
      console.log(generateMemGraph(memSamples));

      await drainPromise;
    },
  );

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
});
