import {
  assert,
  assertSnapshot,
  describe,
  it,
} from "../dependencies/_testing.std.ts";
import { downstream } from "../mod.ts";

const File1GB = `https://speed.hetzner.de/1GB.bin`;
const File100MB = `https://speed.hetzner.de/100MB.bin`;
const File50MB = `https://speed.hetzner.de/50MB.bin`;

/**
 * tc = (Deno) test context
 */
describe(`'downstream' Function`, () => {
  it("returns content size correctly", async () => {
    const { contentLength, closeStreams } = await downstream(File1GB);
    console.log(contentLength);
    assert(typeof contentLength === "number");
    const kb = contentLength / 1024;
    const mb = kb / 1024;
    const gb = mb / 1000; // the 1GB testfile consists of 1000 mb
    assert(gb === 1);
    closeStreams();
  });

  it.ignore(`Reports Progress correctly`, async (tc) => {
    const { progressStream, closeStreams } = await downstream(File50MB);

    const progressEvents: string[] = [];
    for await (const progress of progressStream) {
      console.log(progress);
      progressEvents.push(progress);
    }
    await closeStreams();

    await assertSnapshot(tc, progressEvents);
  });
});
