import { simpleProgressCliRenderer } from "@mod";
import { simpleTimerStream } from "@deps/simpleTimerStream.ts";

// Deno.test(``, async () => {});

Deno.test(`Should output a simple progress bar`, async () => {
  await simpleTimerStream({ maxEventCount: 100, intervalInMilliseconds: 25 })
    .pipeTo(
      simpleProgressCliRenderer(),
    );
});

Deno.test(`Should accept a custom title for the progressbar`, async () => {
  await simpleTimerStream({
    maxEventCount: 100,
    intervalInMilliseconds: 25,
  })
    .pipeTo(
      simpleProgressCliRenderer({ title: "My Custom Bar Title" }),
    );
});
