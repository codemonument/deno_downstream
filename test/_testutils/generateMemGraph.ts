import { ChartJSNodeCanvas } from "npm:chartjs-node-canvas@4.1.6";

/**
 * @param memorySamples a list of memory values.
 * Will plot as:
 *
 * x = index in array
 * y = value in array
 */
export function generateMemGraph(memorySamples: number[]) {
  const chart = new ChartJSNodeCanvas({
    type: "svg",
    width: 800,
    height: 600,
    backgroundColour: "white",
  });

  const chartConfig = {};

  chart.renderToBuffer(chartConfig);
}
