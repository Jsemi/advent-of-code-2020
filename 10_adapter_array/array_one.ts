import { readInput } from "../helpers.ts";

const data = readInput();

export function processData(data: number[]) {
  const arr = [0, ...data, Math.max(...data) + 3];
  return arr.sort((a, b) => a - b);
}

function findJoltageDiffs(
  data: number[],
  [ones, threes]: number[] = [0, 0],
  i = 0,
): [number, number] {
  const [a, b] = data.slice(i, i + 2);
  const diff = b - a;
  if (diff === 1) return findJoltageDiffs(data, [ones + 1, threes], i + 1);
  if (diff === 3) return findJoltageDiffs(data, [ones, threes + 1], i + 1);
  return [ones, threes];
}

const processedData = processData(data);
const [ones, threes] = findJoltageDiffs(processedData);
const result = ones * threes;

console.log(result);
