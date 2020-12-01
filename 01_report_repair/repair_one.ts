import { readInput } from "../helpers.ts";

const data = readInput();

export function findPair(sum: number, data: number[]) {
  for (const entry of data) {
    const pair = sum - entry;
    const hasPair = data.find((e) => e === pair);
    if (hasPair) return [pair, entry];
  }
}

const result = findPair(2020, data)?.reduce((a, b) => a * b);

console.log(result);
