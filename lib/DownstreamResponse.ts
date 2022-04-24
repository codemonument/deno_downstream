export interface DownstreamResponse {
  fileStream: ReadableStream<Uint8Array>;

  /**
   * Contains the decimal number of bytes of the content,
   * as sent by the HTTP Response header Content-Length
   */
  contentLength: number;

  /**
   * A progress stream in percent with fractions of a percent
   * The precision can be set when creating the progress transformer.
   * Default precision is 2 after-comma digits, for example: 10.68 Percent
   *
   * Reason for being string: The deno math package works on strings
   * to avoid precision errors with floating point math in js.
   */
  progressStream: ReadableStream<string>;

  /**
   * Should be set to a method for closing the body and progress stream simultaneously
   */
  closeStreams: () => void;
}
