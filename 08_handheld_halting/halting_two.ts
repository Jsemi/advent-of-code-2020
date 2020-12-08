import { readInputToString } from "../helpers.ts";
import { compute, Instruction, processInstructions } from "./halting_one.ts";

const data = readInputToString();

function flipOperation(op: string) {
  return op === "nop" ? "jmp" : "nop";
}

function fixInstructions(visited: number[], instructions: Instruction[]) {
  for (const idx of visited) {
    const [index, op, operator, arg] = instructions[idx];
    if (op === "jmp" || op === "nop") {
      const fixedInstructions = [...instructions];
      fixedInstructions[idx] = [index, flipOperation(op), operator, arg];
      const result = compute(fixedInstructions[0], fixedInstructions);
      if (!result[1].length) return result[0];
    }
  }
}

const instructions = processInstructions(data);
const visited = compute(instructions[0], instructions)[1];
const result = fixInstructions(visited, instructions);

console.log(result);
