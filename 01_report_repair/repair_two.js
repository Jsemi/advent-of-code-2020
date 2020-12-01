import { readInput } from "../helpers.js";
import { findPair } from "./repair_one.js";

const data = await readInput();

function findTriplet(sum, data) {
  for (const entry of data) {
    const remaining = sum - entry;
    const pair = findPair(remaining, data);
    if (pair) return [...pair, entry];
  }
}

const result = findTriplet(2020, data).reduce((a, b) => a * b);

console.log(result);
