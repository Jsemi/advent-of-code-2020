import { readInput } from "../helpers.ts";
import { findDeviation } from "./error_one.ts";

const data = readInput();

function findContiguous(
  deviation: number,
  data: number[],
  i = 0,
  j = 1,
): number[] {
  const arr = data.slice(i, j);
  const sum = arr.reduce((a, b) => a + b);
  if (sum > deviation) return findContiguous(deviation, data, i + 1, j);
  if (sum < deviation) return findContiguous(deviation, data, i, j + 1);
  return arr;
}

const deviation = findDeviation(25, data);
const contiguous = findContiguous(deviation, data);
const result = Math.min(...contiguous) + Math.max(...contiguous);

console.log(result);
