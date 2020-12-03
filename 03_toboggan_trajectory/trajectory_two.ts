import { readInputToString } from "../helpers.ts";
import { traceTrajectory } from "./trajectory_one.ts";

const data = readInputToString();

const routes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

function calculateRoutes(routes: number[][], data: string[]) {
  return routes.reduce((acc, [x, y]) => acc * traceTrajectory(x, y, data), 1);
}

const result = calculateRoutes(routes, data);

console.log(result);
