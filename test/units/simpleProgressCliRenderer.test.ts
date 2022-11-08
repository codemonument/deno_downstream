import { simpleProgressCliRenderer } from "@mod";
import { timerSource } from "@deps/rx_webstreams.ts";

// Deno.test(``, async () => {});

Deno.test(`Should output a simple progress bar`, async () => {
  await timerSource({ maxEventCount: 100, intervalInMilliseconds: 25 })
    .pipeTo(
      simpleProgressCliRenderer(),
    );
});

Deno.test(`Should accept a custom title for the progressbar`, async () => {
  await timerSource({
    maxEventCount: 100,
    intervalInMilliseconds: 25,
  })
    .pipeTo(
      simpleProgressCliRenderer({ title: "My Custom Bar Title" }),
    );
});
