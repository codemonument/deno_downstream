import { Big, div, plus, round, times } from "../dependencies/_math.std.ts";
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
export function progressTransformer(
  { maxBytes, precision = 2 }: ProgressTransformerOptions,
) {
  let writtenBytes = new Big("0");
  const progressTransformer = new TransformStream<Uint8Array, string>({
    start() {},
    transform(chunk, controller) {
      writtenBytes = writtenBytes.plus(chunk.length);
      const progressPercent = writtenBytes
        .div(maxBytes)
        .times("100");
      controller.enqueue(progressPercent.round(precision).toString());
    },
    flush(controller) {
      controller.terminate();
    },
  });

  return progressTransformer;
}
