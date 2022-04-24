/**
 * Creates a Stream Transformer to convert a ReadableStream into a Progress Stream for the download progress in percent
 * @param maxBytes the byte count of the file download
 */
export function createProgressTransformer(maxBytes: number) {
  let writtenBytes = 0;
  const progressTransformer = new TransformStream<Uint8Array, number>({
    start() {},
    transform(chunk, controller) {
      writtenBytes += chunk.length;
      const progressPercent = (writtenBytes / maxBytes) * 100;
      controller.enqueue(progressPercent);
    },
    flush() {},
  });

  return progressTransformer;
}
