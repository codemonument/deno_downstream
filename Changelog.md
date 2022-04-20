# Changelog 

## 0.1.0 - Initial Version

- add downstream function which queries a resource on the web via fetch and returns a Downstream response, containing 
    - a `body` property of type ReadableStream<Uint8Array>
    - reserved: a `progress` property for later, which should return the progress of the download (work-in-progress) 
