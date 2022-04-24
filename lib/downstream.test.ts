import {
  assert,
  assertRejects,
  assertSnapshot,
  describe,
  it,
} from "../dependencies/_testing.std.ts";
import { ProgressBar } from "../dependencies/_progressbar.ts";
import { downstream } from "../mod.ts";
import { File100MB, File1GB, File50MB404 } from "../test/testfiles.ts";

describe(`'downstream' Regression Tests`, () => {
  it(`should not leak streams on http errors (like 404)`, () =>
    assertRejects(() => downstream(File50MB404)));
});

/**
 * tc = (Deno) test context
 */
describe(`'downstream'`, () => {
  it.ignore("returns content size correctly", async () => {
    try {
      const { closeStreams, fileStream, progressStream } = await downstream(
        File1GB,
      );
      await closeStreams();

      // console.log(result.contentLength);
      // const kb = result.contentLength / 1024;
      // const mb = kb / 1024;
      // const gb = mb / 1000; // the 1GB testfile consists of 1000 mb
      // await result.closeStreams();
    } catch (error) {
      console.error(error);
    }

    // assert(typeof contentLength === "number");
    // assert(gb === 1);
  });

  it(`Reports Progress correctly`, async (tc) => {
    const { progressStream, closeStreams } = await downstream(File100MB);
    const progressEvents: string[] = [];
    const progressBar = new ProgressBar({ title: "downloading: ", total: 100 });

    for await (const progress of progressStream) {
      progressBar.render(Number.parseFloat(progress));
      progressEvents.push(progress);
    }

    await assertSnapshot(tc, progressEvents);
    await closeStreams();
  });
});
