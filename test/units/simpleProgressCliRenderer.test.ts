import { simpleProgressCliRenderer } from "@mod";
import { timerSource } from "@deps/rx_webstreams.ts";

// Deno.test(``, async () => {});

const mockProgressSource = () => timerSource({ maxEventCount: 100, intervalInMilliseconds: 25 });

Deno.test(`Should output a simple progress bar`, async () => {
  await mockProgressSource()
    .pipeTo(
      simpleProgressCliRenderer(),
    );
});

Deno.test(`Should accept a custom title for the progressbar`, async () => {
  await mockProgressSource()
    .pipeTo(
      simpleProgressCliRenderer({ title: "My Custom Bar Title" }),
    );
});
