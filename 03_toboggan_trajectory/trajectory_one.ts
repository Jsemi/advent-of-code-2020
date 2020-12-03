import { readInputToString } from "../helpers.ts";

const data = readInputToString();

export function traceTrajectory(right: number, down: number, data: string[]) {
  let x = 0;
  let y = 0;
  let trees = 0;

  while (y < data.length) {
    const entry = data[y];
    if (x >= entry.length) x = x - entry.length;
    if (entry[x] === "#") trees++;
    x += right;
    y += down;
  }

  return trees;
}

const result = traceTrajectory(3, 1, data);

console.log(result);
