/**
 * Creates a Stream Transformer to convert a ReadableStream into a Progress Stream for the download progress in percent
 * @param bytes the byte count of the file download
 */
export function createProgressTransformer(bytes: number) {
  const progressTransformer = new TransformStream({
    start(controller) {
    },
    transform(chunk, controller) {
    },
    flush(controller) {
    },
  });

  return progressTransformer;
}
