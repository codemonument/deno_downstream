import {} from "../mod.ts";
import { log } from "../deps/_log.std.ts";
import { VERSION } from "../version.ts";

try {
  log.info(`Module Version (version.ts): ${VERSION}`);
} catch (error) {
  console.error(error);
  Deno.exit();
}
