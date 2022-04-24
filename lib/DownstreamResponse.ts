export interface DownstreamResponse {
  body: ReadableStream<Uint8Array>;

  /**
   * Contains the decimal number of bytes of the content,
   * as sent by the HTTP Response header Content-Length
   */
  contentLength: number;

  // TODO: Figure out, how to implement a progress stream in percent
  // see: https://medium.com/deno-the-complete-reference/readable-streams-in-deno-e5d707735a77
  progress?: ReadableStream<number>;

  /**
   * Should be set to a method for closing the body and progress stream simultaneously
   */
  closeStreams: () => void;
}
