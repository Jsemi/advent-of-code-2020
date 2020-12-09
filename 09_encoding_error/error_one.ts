import { readInput } from "../helpers.ts";

const data = readInput();

function findPair(preamble: number[], n: number) {
  return preamble.some((entry, i) => preamble.slice(i + 1).includes(n - entry));
}

export function findDeviation(init: number, data: number[], i = 0): number {
  const preamble = data.slice(i, init);
  const rest = data.slice(init);
  const hasPair = findPair(preamble, rest[0]);
  if (hasPair) return findDeviation(init + 1, data, i + 1);
  return rest[0];
}

const result = findDeviation(25, data);

console.log(result);
