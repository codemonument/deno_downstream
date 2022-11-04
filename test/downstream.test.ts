import {
  assert,
  assertRejects,
  assertSnapshot,
} from "../dependencies/_testing.std.ts";
import { downstream } from "../mod.ts";
import {
  File100MB,
  File1GB,
  File50MB,
  File50MB404,
} from "./_testutils/testfiles.ts";
import { drainStream } from "./_testutils/drainStream.ts";
import { ProgressBar } from "../dependencies/_progressbar.ts";

/**
 * tc = (Deno) test context
 */
Deno.test(`'downstream' function`, async (tc) => {
  await tc.step(`Rejects when HTTP Status is !== 2XX`, async () => {
    await assertRejects(async () => await downstream(File50MB404));
  });

  await tc.step(`Runs tests correctly (consuming streams)`, async () => {
    const { fileStream, contentLength } = await downstream(
      File50MB,
    );

    assert(typeof contentLength === "number");
    assert(contentLength > 0);

    // needs to be done to not crash deno test
    await drainStream(fileStream);

    // This doesn't work for some reason
    // TODO: => why do I not have to close the progressStream after draining the fileStream???
    // await closeStreams();
  });

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
    const { progressStream, fileStream } = await downstream(File100MB);
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
