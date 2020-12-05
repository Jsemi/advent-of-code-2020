import { readInputToString } from "../helpers.ts";
import { getSeatId, range } from "./boarding_one.ts";

const data = readInputToString();

function getMySeat(ids: number[]) {
  const min = Math.min(...ids);
  const max = Math.max(...ids);
  const seats = range(max, min);
  return seats.filter((seat) => !ids.includes(seat))[0];
}

const takenSeats = data.map(getSeatId);
const result = getMySeat(takenSeats);

console.log(result);
