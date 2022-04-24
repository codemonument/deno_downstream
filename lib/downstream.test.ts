import { assert, describe, it } from "../dependencies/_testing.std.ts";
import { downstream } from "../mod.ts";

const File1GB = `https://speed.hetzner.de/1GB.bin`;
const File100MB = `https://speed.hetzner.de/100MB.bin`;

describe(`'downstream' Function`, () => {
  it("returns content size correctly", async () => {
    const result = await downstream(File1GB);
    console.log(result.contentLength);
    assert(typeof result.contentLength === "number");
    const kb = result.contentLength / 1024;
    const mb = kb / 1024;
    const gb = mb / 1000; // the 1GB testfile consists of 1000 mb
    assert(gb === 1);
    result.closeStreams();
  });

  it(`Reports Progress correctly`, async () => {
    const { progress, closeStreams } = await downstream(File100MB);

    for await (const chunk of progress) {
      console.log(chunk);
    }

    closeStreams();
  });
});
