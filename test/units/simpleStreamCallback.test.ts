import { simpleTimerStream } from "@deps/simpleTimerStream.ts";
import { simpleStreamCallback } from "@mod";

Deno.test(`simpleStreamCallback Adapter`, async (tc) => {
  await simpleTimerStream({ intervalInMilliseconds: 500 }).pipeTo(
    simpleStreamCallback((chunk) => {
      console.log(chunk);
    }),
  );
});
