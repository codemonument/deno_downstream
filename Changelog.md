# Changelog

## 0.3.2 - 2023-06-10 (WIP)

- Improving memory usage measurement for downloading 1 GB file

## 0.3.2 - 2022-11-08

- Update `progressbar` dependency to 1.3.3 (fixes availability in `deno test`)
  - Note: There is still a bug on MultiProgressBar on MacOS: https://github.com/deno-library/progress/issues/15

## 0.3.1 - 2022-11-05

- Add `title` option to `simpleProgressCliRenderer`

## 0.3.0 - 2022-11-05

- Add streamAdapter: simpleStreamCallback => A WritableStream which can be used to pipe another stream into and get access to the chunks in a callback function
- Add streamAdapter: simpleProgressCliRenderer => A WritableStream which can be used to pipe a progress stream to render it on the cli

## 0.2.0 - 2022-11-05

- add the implementation for the `progressStream: ReadableStream<string>;` property on the DownstreamResponse object
  with Unit Tests!

## 0.1.0 - Initial Version

- add downstream function which queries a resource on the web via fetch and returns a Downstream response, containing
  - a `body` property of type ReadableStream<Uint8Array>
  - reserved: a `progress` property for later, which should return the progress of the download (work-in-progress)
