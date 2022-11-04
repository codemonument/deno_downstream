import {
  assert,
  assertRejects,
  assertSnapshot,
  deadline,
  describe,
  it,
} from "../dependencies/_testing.std.ts";
import { downstream } from "../mod.ts";
import {
  File100MB,
  File1GB,
  File50MB,
  File50MB404,
} from "./_testutils/testfiles.ts";
import { drainStream } from "./_testutils/drainStream.ts";

// describe(`'downstream' Regression Tests`, () => {
//   it(`should not leak streams on http errors (like 404)`, () =>
//     assertRejects(() => downstream(File50MB404)));
// });

/**
 * tc = (Deno) test context
 */
Deno.test(`'downstream' function`, async (tc) => {
  await tc.step(`Rejects when HTTP Status is !== 2XX`, async () => {
    await assertRejects(async () => await downstream(File50MB404));
  });

  await tc.step(`Runs tests correctly (consuming streams)`, async () => {
    const { closeStreams, fileStream, contentLength } = await downstream(
      File50MB,
    );

    assert(typeof contentLength === "number");
    assert(contentLength > 0);

    await drainStream(fileStream);

    // This doesn't work for some reason
    // TODO: => why do I not have to close the progressStream after draining the fileStream???
    // await closeStreams();
  });
});

// describe(`'downstream' function`, () => {
// it(`Rejects when HTTP Status is !== 2XX`, async () => {
//   await assertRejects(async () => await downstream(File50MB404));
// });

// it("returns content size correctly", async (tc) => {
//   // try {
//   const { closeStreams, fileStream, progressStream, contentLength } =
//     await downstream(
//       File50MB,
//     );

//   console.log(contentLength);

//   await fileStream.cancel();
//   await progressStream.cancel();

//   // await closeStreams();

//   // console.log(result.contentLength);
//   // const kb = result.contentLength / 1024;
//   // const mb = kb / 1024;
//   // const gb = mb / 1000; // the 1GB testfile consists of 1000 mb
//   // await result.closeStreams();
//   // } catch (error) {
//   //   console.error(error);
//   // }

//   // assert(typeof contentLength === "number");
//   // assert(gb === 1);
// });

// it(`Reports Progress correctly`, async (tc) => {
//   const { progressStream, closeStreams } = await downstream(File100MB);
//   const progressEvents: string[] = [];
//   const progressBar = new ProgressBar({ title: "downloading: ", total: 100 });

//   for await (const progress of progressStream) {
//     progressBar.render(Number.parseFloat(progress));
//     progressEvents.push(progress);
//   }

//   await assertSnapshot(tc, progressEvents);
//   await closeStreams();
// });
// });
