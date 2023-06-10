import { assert, assertRejects, assertSnapshot } from "@deps/_testing.std.ts";
import { downstream } from "@mod";
import { File100MB, File50MB, File50MB404 } from "@testutils/testfiles.ts";
import { drainStream } from "@testutils/drainStream.ts";
import { ProgressBar } from "@deps/_progressbar.ts";

/**
 * tc = (Deno) test context
 */
Deno.test(`'downstream' function`, async (tc) => {
  await tc.step(`Rejects when HTTP Status is !== 2XX`, async () => {
    await assertRejects(async () => await downstream(File50MB404));
  });

  await tc.step(
    `Simple streaming download and ignoring the progressStream`,
    async () => {
      const { fileStream, contentLength } = await downstream(
        "http://ipv4.download.thinkbroadband.com/50MB.zip",
      );

      assert(typeof contentLength === "number");
      assert(contentLength > 0);

      // needs to be done to consume the fileStream,
      // otherwise deno test will crash
      await drainStream(fileStream);
    },
  );

  await tc.step(`Returns content size correctly`, async () => {
    const { fileStream, contentLength } = await downstream(
      File50MB,
    );

    const kb = contentLength / 1024;
    const mb = kb / 1024;
    assert(mb === 50); // the 50MB testfile consists of 50MB

    // needs to be done to not crash deno test
    await drainStream(fileStream);
  });

  await tc.step(`Reports Progress correctly`, async () => {
    const progressBar = new ProgressBar({ title: "downloading: ", total: 100 });

    const { progressStream, fileStream } = await downstream(File100MB);
    const progressEvents: string[] = [];

    for await (const progress of progressStream) {
      progressBar.render(Number.parseFloat(progress));
      progressEvents.push(progress);
    }

    await assertSnapshot(tc, progressEvents.length);
    // needs to be done to not crash deno test
    await drainStream(fileStream);
  });
});
