export function simpleTimerStream(eventCount = 15, interval = 1000) {
  let timerId: number | undefined;

  const readableStream = new ReadableStream<number>({
    start(controller) {
      let events = 0;

      timerId = setInterval(() => {
        events++;
        controller.enqueue(events);

        if (events === eventCount) {
          clearInterval(timerId);
          controller.close();
        }
      }, interval);
    },
    pull(_controller) {
    },
    cancel(reason) {
      console.error(`DemoReadableStream cancelled bc. of: `, reason);
      clearInterval(timerId);
    },
  });

  return readableStream;
}
