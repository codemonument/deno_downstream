import { assert, describe, it } from "../dependencies/_testing.std.ts";
import { downstream } from "../mod.ts";

const File1GB = `https://speed.hetzner.de/1GB.bin`;

describe(`'downstream' Function`, () => {
  it("returns content size correctly", async () => {
    const result = await downstream(File1GB);
    console.log(result.contentLength);
    assert(typeof result.contentLength === "number");
    result.closeStreams();
  });
});
