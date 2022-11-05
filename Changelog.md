# Changelog 

## 0.2.0 - 2022-11-05 

- add the implementation for the `progressStream: ReadableStream<string>;` property on the DownstreamResponse object
  with Unit Tests!

## 0.1.0 - Initial Version

- add downstream function which queries a resource on the web via fetch and returns a Downstream response, containing 
    - a `body` property of type ReadableStream<Uint8Array>
    - reserved: a `progress` property for later, which should return the progress of the download (work-in-progress) 
