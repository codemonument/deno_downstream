import { MultiProgressBar } from "@deps/_progressbar.ts";
import { sleep } from "https://deno.land/x/sleep/mod.ts";

const multibar = new MultiProgressBar({
  title: "Multi-Progress Bars",
  complete: "=",
  incomplete: "-",
  display: "[:bar] :text :percent :time :completed/:total",
});

multibar.render([
  { text: "progress_1", completed: 1 },
]);

// sleep(1);

multibar.render([
  { text: "progress_1", completed: 2 },
  { text: "progress_2", completed: 1 },
]);

// sleep(1);

multibar.render([
  { text: "progress_1", completed: 2 },
  { text: "progress_2", completed: 2 },
]);

multibar.render([
  { text: "progress_1", completed: 3 },
  { text: "progress_2", completed: 2 },
  { text: "progress_3", completed: 1 },
]);
