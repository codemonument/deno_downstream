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

  /**
   * Concrete Problem: test empties event loop before promises can resolve.
   * https://github.com/denoland/deno/issues/13146
   *
   * How to solve that: A Timeout per test, to make the runtime wait the specified amount of time!
   * Issue Thread for Solution:
   * https://github.com/denoland/deno/issues/11133
   *
   * Quickfix: solve this with the `deadline` function
   */
  const testcase = async () => {
    const { closeStreams, fileStream, progressStream, contentLength } =
      await downstream(
        File50MB,
      );

    console.log(contentLength);
    assert(contentLength);

    await drainStream(fileStream);

    // queueMicrotask(async () => await closeStreams());

    // let counter = 0;
    // const intervalId = setInterval(async () => {
    //   console.log(`Demo Interval`);
    //   counter += 1;

    //   if (counter === 5) {
    //     await closeStreams();
    //     clearInterval(intervalId);
    //   }
    // }, 1000);

    // await fileStream.cancel();
    // await progressStream.cancel();
    // await deadline(closeStreams(), 1000);
  };

  await tc.step(`Closes Streams Correctly`, testcase);
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
