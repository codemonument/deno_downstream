import { simpleProgressCliRenderer } from "@mod";
import {
  map,
  multiplexSource,
  reduce,
  simpleCallbackTarget,
  timerSource,
} from "@deps/rx_webstreams.ts";

// Deno.test(``, async () => {});

const mockProgressSource = () =>
  timerSource({ maxEventCount: 100, intervalInMilliseconds: 25 });

Deno.test(`Should output multiple progress bars`, async () => {
  const pipeToPromise = multiplexSource([{
    name: "progress_1",
    readable: mockProgressSource(),
  }, {
    name: "progress_2",
    readable: mockProgressSource(),
  }, {
    name: "progress_3",
    readable: mockProgressSource(),
  }])
    // reduce to progress-compatible state
    .pipeThrough(
      reduce((progressEvent, multiProgressState) => {
        multiProgressState.set(progressEvent.name, progressEvent.value);
        return multiProgressState;
      }, { initialAggregate: new Map<string, number>() }),
    )
    .pipeThrough(
      map((map) =>
        Array.from(map.entries()).map(([streamName, streamProgress]) => ({
          text: streamName,
          completed: streamProgress,
          total: 100,
        }))
      ),
    )
    .pipeTo(simpleCallbackTarget(
      (chunk) => console.log(chunk),
    ));

  await pipeToPromise;
});
