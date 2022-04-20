import { startKia } from "../mod.ts";
import { log } from "../dependencies/_log.std.ts";
import { VERSION } from "../version.ts";

try {
  const demoKia = await startKia(
    `Base Deno Module Example, Sleep for 3 sek`,
  );
  setTimeout(async () => {
    await demoKia.succeed(
      `Finished Base Deno Repo sucessfully}`,
    );
    log.info(`Module Version (version.ts): ${VERSION}`);
  }, 3000);
} catch (error) {
  console.error(error);
  Deno.exit();
}
