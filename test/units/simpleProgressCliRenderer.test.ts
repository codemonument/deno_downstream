import { simpleProgressCliRenderer } from "@mod";
import { simpleTimerStream } from "@deps/simpleTimerStream.ts";

Deno.test(`simpleProgressCliRenderer Adapter`, async (tc) => {
  await simpleTimerStream({ maxEventCount: 100, intervalInMilliseconds: 25 })
    .pipeTo(
      simpleProgressCliRenderer(),
    );
});
