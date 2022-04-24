export interface ProgressTransformerOptions {
  maxBytes: number;

  /**
   * The number of digits which should be used after the comma
   * Defaults to 2 (example: 10.68 Percent)
   */
  precision?: number;
}

/**
 * Creates a Stream Transformer to convert a ReadableStream into a Progress Stream for the download progress in percent
 */
export function createProgressTransformer(
  { maxBytes, precision = 2 }: ProgressTransformerOptions,
) {
  let writtenBytes = 0;
  const progressTransformer = new TransformStream<Uint8Array, number>({
    start() {},
    transform(chunk, controller) {
      writtenBytes += chunk.length;
      const progressPercent = (writtenBytes / maxBytes) * 100;
      const progressWithPrecision = Number.parseFloat(
        progressPercent.toFixed(precision),
      );
      controller.enqueue(progressWithPrecision);
    },
    flush() {},
  });

  return progressTransformer;
}
