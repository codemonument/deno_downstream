/**
 * This test file uses the large test files.
 * Excluded from the other downstream test file to not have to wait for that long every time.
 */

import { ProgressBar } from "../dependencies/_progressbar.ts";
import { assertSnapshot } from "../dependencies/_testing.std.ts";
import { downstream } from "../mod.ts";
import { drainStream } from "./_testutils/drainStream.ts";
import { File1GB } from "./_testutils/testfiles.ts";

Deno.test(`Demo Test`, async (tc) => {
  /**
   * Problem: Still full 1GB File in Memory!
   * https://github.com/denoland/deno/issues/16544
   */
  await tc.step(`Reports Progress on big file (1GB) correctly`, async () => {
    const { progressStream, fileStream } = await downstream(File1GB);
    const progressEvents: string[] = [];
    const progressBar = new ProgressBar({ title: "downloading: ", total: 100 });

    for await (const progress of progressStream) {
      progressBar.render(Number.parseFloat(progress));
      progressEvents.push(progress);
    }

    await assertSnapshot(tc, progressEvents.length);
    // needs to be done to not crash deno test
    await drainStream(fileStream);
  });
});