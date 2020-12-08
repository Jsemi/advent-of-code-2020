import { readInputToString } from "../helpers.ts";

const data = readInputToString();

export type Instruction = [number, string, string, number];

export function processInstructions(data: string[]) {
  return data.map((entry, idx) => {
    const [, op, operator, arg] = entry.match(/([a-z]{3}) (\-|\+)(\d*)/) || [];
    return [idx, op, operator, Number(arg)] as Instruction;
  });
}

export function compute(
  row: Instruction,
  list: Instruction[],
  acc = 0,
  visited: number[] = [],
): [number, number[]] {
  if (row) {
    const [idx, op, operator, arg] = row;
    if (visited.includes(idx)) return [acc, visited];

    const vis = [...visited, idx];
    switch (op) {
      case "acc":
        return compute(list[idx + 1], list, eval(acc + operator + arg), vis);
      case "jmp":
        return compute(list[eval(idx + operator + arg)], list, acc, vis);
      case "nop":
        return compute(list[idx + 1], list, acc, vis);
    }
  }
  return [acc, []];
}

const instructions = processInstructions(data);
const result = compute(instructions[0], instructions)[0];

console.log(result);
