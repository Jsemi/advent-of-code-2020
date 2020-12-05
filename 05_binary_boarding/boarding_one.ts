import { readInputToString } from "../helpers.ts";

const data = readInputToString();

function traversePosition(instruction: string, range: number[]): number {
  const action = instruction[0];
  const remainingInstructions = instruction.substring(1);

  if (action === "B" || action === "R") {
    const upper = range.slice(range.length / 2);
    return traversePosition(remainingInstructions, upper);
  }

  if (action === "F" || action === "L") {
    const lower = range.slice(0, range.length / 2);
    return traversePosition(remainingInstructions, lower);
  }

  return range[0];
}

export function range(end: number, start = 0): number[] {
  if (start === end) return [start];
  return [start, ...range(end, start + 1)];
}

export function getSeatId(position: string) {
  const [, row, column] = position.match(/^([BF]{7})([LR]{3})$/) || [];
  const seatRow = traversePosition(row, range(127));
  const seatColumn = traversePosition(column, range(7));
  const seatId = seatRow * 8 + seatColumn;
  return seatId;
}

const result = Math.max(...data.map(getSeatId));

console.log(result);
