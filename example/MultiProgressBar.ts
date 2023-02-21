import { MultiProgressBar } from "@deps/_progressbar.ts";

const multibar = new MultiProgressBar({
  title: "Multi-Progress Bars",
  complete: "=",
  incomplete: "-",
  display: "[:bar] :text :percent :time :completed/:total",
});

multibar.render([
  { text: "progress_1", completed: 1 },
  { text: "progress_2", completed: 1 },
]);

multibar.render([
  { text: "progress_1", completed: 1 },
  { text: "progress_2", completed: 1 },
  { text: "progress_3", completed: 1 },
]);
