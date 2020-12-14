import { readInputToString } from "../helpers.ts";

const data = readInputToString();

function setMaskValues(value: string[], mask: string[]) {
  return value.map((val, i) => {
    const maskValue = mask[i];
    if (["0", "1"].includes(maskValue)) return maskValue;
    return val;
  }).join("");
}

function writeToMemory(
  row: string,
  mask: string[],
  memory: Map<number, number>,
) {
  const [, adr, val] = row.match(/^mem\[([0-9]+)\] = ([0-9]+)$/) || [];
  const address = Number(adr);
  const value = Number(val);
  const binaryValue = value.toString(2).padStart(36, "0").split("");
  const result = setMaskValues(binaryValue, mask);
  const binaryResult = parseInt(result, 2);
  memory.set(address, binaryResult);
  return memory;
}

export function compute(
  data: string[],
  memoryFn: (
    row: string,
    mask: string[],
    memory: Map<number, number>,
  ) => Map<number, number>,
  memory: Map<number, number> = new Map(),
  mask: string[] = [],
  i = 0,
): Map<number, number> {
  const row = data[i];
  if (!row) return memory;
  if (row.includes("mask")) {
    const newMask = row.split(" = ")[1].split("");
    return compute(data, memoryFn, memory, newMask, i + 1);
  }

  const newMemory = memoryFn(row, mask, memory);
  return compute(data, memoryFn, newMemory, mask, i + 1);
}

const memoryState = compute(data, writeToMemory);
const result = [...memoryState.values()].reduce((a, b) => a + b);

console.log(result);
