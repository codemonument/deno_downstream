# Downstream

A deno module for downloading files in a streaming fashion.
The base of this module is `downstream.ts`, which queries the file and returns the ReadableStream<UInt8Array>,
as well as a progress Stream in percent (from 0 to 100).

This base function is then augmented with various utility functions for writing this stream into a file
or passing it to other streams, as I see fit. (Not included yet)

## Included Utilities

### ProgressBar Class

Basic Usage Example

```ts
// 1. Initialize a ProgressBar
const progressBar = new ProgressBar({
	title: 'downloading: ',
	total: 100,
});

// 2. Use the downstream function and get the fileStream and the progressStream out
const {progressStream, fileStream} = await downstream(File1GB);

// 3. Set up handling of your fileStream
// CAUTION: DO NOT use await here, but save the fileStream handling promise and await it after the progressStream handling below.
// Otherwise your progress stream will not show anything (since deno is waiting for the file handling to finish)

// 3. a) Generate a temp file
const tempFilePath = await Deno.makeTempFile();
const tempFile = await Deno.open(tempFilePath, {write: true});
const fileHandlingPromise = fileStream.pipeTo(tempFile.writable);

// 4. Get each progress stream event and render the state to the progress bar
for await (const progress of progressStream) {
	progressBar.render(Number.parseFloat(progress));
}

// 5. Await the file handling promise from step 3
await fileHandlingPromise;

// 6. Cleanup the temp file
await Deno.remove(tempFilePath);
```

## Running examples

see `tasks` property in `deno.json`
Run each key there with `deno task <task-key>`

## Useful Links

- Big test files for testing these download functions: https://testfiledownload.com/
- How to pipe streams in deno: https://deno.land/manual/examples/fetch_data#files-and-streams
- Guide to Web Streams: https://web.dev/streams/#creating-a-transform-stream
