import { readInput } from "../helpers.ts";
import { findPair } from "./repair_one.ts";

const data = readInput();

function findTriplet(sum: number, data: number[]) {
  for (const entry of data) {
    const remaining = sum - entry;
    const pair = findPair(remaining, data);
    if (pair) return [...pair, entry];
  }
}

const result = findTriplet(2020, data)?.reduce((a, b) => a * b);

console.log(result);
