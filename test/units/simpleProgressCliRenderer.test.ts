import { simpleProgressCliRenderer } from "@mod";
import { simpleTimerStream } from "@deps/simpleTimerStream.ts";

Deno.test(`simpleProgressCliRenderer Adapter`, async (tc) => {
  await tc.step(`should output a simple progress bar`, async () => {
    await simpleTimerStream({ maxEventCount: 100, intervalInMilliseconds: 25 })
      .pipeTo(
        simpleProgressCliRenderer(),
      );
  });

  await tc.step(
    `should accept a custom title for the progressbar`,
    async () => {
      await simpleTimerStream({
        maxEventCount: 100,
        intervalInMilliseconds: 25,
      })
        .pipeTo(
          simpleProgressCliRenderer({ title: "My Custom Bar Title" }),
        );
    },
  );
});
