export interface DownstreamResponse {
  body: ReadableStream<Uint8Array>;

  // TODO: Figure out, how to implement a progress stream in percent
  // see: https://medium.com/deno-the-complete-reference/readable-streams-in-deno-e5d707735a77
  progress?: ReadableStream<number>;
}
