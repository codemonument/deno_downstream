export interface DownstreamResponse {
  body: ReadableStream<Uint8Array>;

  /**
   * Contains the decimal number of bytes of the content,
   * as sent by the HTTP Response header Content-Length
   */
  contentLength: number;

  /**
   * A progress stream in percent with fractions of a percent
   */
  progress: ReadableStream<number>;

  /**
   * Should be set to a method for closing the body and progress stream simultaneously
   */
  closeStreams: () => void;
}
