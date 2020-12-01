import { readInput } from "../helpers.js";

const data = await readInput();

export function findPair(sum, data) {
  for (const entry of data) {
    const pair = sum - entry;
    const hasPair = data.find((e) => e === pair);
    if (hasPair) return [pair, entry];
  }
}

const result = findPair(2020, data).reduce((a, b) => a * b);

console.log(result);
