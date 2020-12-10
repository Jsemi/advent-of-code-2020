import { readInput } from "../helpers.ts";
import { processData } from "./array_one.ts";

const data = readInput();

function findArrangements(data: number[]) {
  const cache = new Map([[0, 1]]);
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; data[j] <= data[i] + 3; j++) {
      cache.set(j, (cache.get(j) || 0) + (cache.get(i) || 0));
    }
  }
  return cache.get(data.length - 1);
}

const processedData = processData(data);
const result = findArrangements(processedData);

console.log(result);
