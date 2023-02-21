import { MultiProgressBar } from "https://deno.land/x/progress@v1.3.7/mod.ts";
import { sleep } from "https://deno.land/x/sleep/mod.ts";

const multibar = new MultiProgressBar({
  title: "Multi-Progress Bars",
  complete: "=",
  incomplete: "-",
  interval: 1,
  display: "[:bar] :text :percent :time :completed/:total",
});

multibar.render([
  { text: "progress_1", completed: 1 },
]);

await sleep(0.002);

multibar.render([
  { text: "progress_1", completed: 2 },
  { text: "progress_2", completed: 1 },
]);

await sleep(0.002);

multibar.render([
  { text: "progress_1", completed: 2 },
  { text: "progress_2", completed: 2 },
]);

await sleep(0.002);

multibar.render([
  { text: "progress_1", completed: 3 },
  { text: "progress_2", completed: 2 },
  { text: "progress_3", completed: 1 },
]);
