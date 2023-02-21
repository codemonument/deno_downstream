const json = await Deno.readTextFile("./test/large/memSamples.json");
import { generateMemGraph } from "@testutils/generateMemGraph.ts";

const data = JSON.parse(json);

const graph = generateMemGraph(data);

console.log(graph);
