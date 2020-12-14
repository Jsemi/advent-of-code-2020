import { readInputToString } from "../helpers.ts";
import { compute } from "./data_one.ts";

const data = readInputToString();

function replaceAt(str: string, idx: number, replace: string) {
  return `${str.substring(0, idx)}${replace}${str.substring(idx + 1)}`;
}

function findAddresses(address: string, i = 0): string[] {
  if (!address[i]) return [address];
  if (address[i] === "X") {
    const floating = [replaceAt(address, i, "0"), replaceAt(address, i, "1")];
    return floating.flatMap(
      (adr) => [...findAddresses(adr, i + 1)],
    );
  }
  return findAddresses(address, i + 1);
}

function setMaskValues(address: string[], mask: string[]) {
  return address.map((value, i) => {
    const maskValue = mask[i];
    switch (maskValue) {
      case "0":
        return value;
      case "1":
        return "1";
      case "X":
        return "X";
    }
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
  const binaryAddress = address.toString(2).padStart(36, "0").split("");
  const changedAddress = setMaskValues(binaryAddress, mask);
  const addresses = findAddresses(changedAddress);
  addresses.forEach((add) => memory.set(parseInt(add, 2), value));
  return memory;
}

const memoryState = compute(data, writeToMemory);
const result = [...memoryState.values()].reduce((a, b) => a + b);

console.log(result);
