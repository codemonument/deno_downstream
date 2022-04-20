# Downstream

**CAUTION: HIGHLY EXPERIMENTAL AT THE MOMENT!**

A deno module for downloading files in a streaming fashion. 
The base of this module is `downstream.ts`, which queries the file and returns the ReadableStream<UInt8Array>, 
as well as a progress Stream in percent (from 0 to 100) (not included yet). 
 
This base function is then augmented with various utility functions for writing this stream into a file 
or passing it to other streams, as I see fit. 

## Folder Structure

- `.vscode` = A folder, 
  - containing a `settings.json` which activates the deno language server for this workspace
  - containing a `extensions.json` with recommended vscode extensions for this workspace
- `example` = A folder, containing entry deno files for demonstrating the modules functionalities 
   - contains `main.ts` - the default file for examples
- `dependencies` = A folder, including dependency re-exports
- `my_module_part` = A folder containing more source files which are exported by `mod.ts`
   - Hint: you may create multiple of them to structure your module.
- `.gitignore` = A normal gitingore file
- `deno.json` - a config file for the deno cli
   - includes tasks (a.k.a aliases for long commands) with `deno task`
- `LICENSE`
- `mod.ts` = the entrypoint for this deno module, which exports all functionality of this module
- `Readme.md` = A normal Readme file

## Running examples 

see `tasks` property in `deno.json`
Run each key there with `deno task <task-key>`

## Customize this repo 

- rename `my_module_part` folder to something which makes more sense for your deno module 
- replace `my_module_part/startKia.ts` with a file which makes more sense for your deno module

## Configure Deployments to deno.land/x 

see https://deno.land/add_module