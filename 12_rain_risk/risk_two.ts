import { instruction, readInput } from "./risk_one.ts";

const data = readInput();
type coords = [number, number];

function rotate(waypoint: coords, amount: number): coords {
  const [x, y] = waypoint;
  switch (amount) {
    case -90:
    case 270:
      return [y * -1, x];
    case -180:
    case 180:
      return [x * -1, y * -1];
    case -270:
    case 90:
      return [y, x * -1];
    case 0:
    default:
      return waypoint;
  }
}

function readInstructions(
  data: instruction[],
  ship: coords = [0, 0],
  waypoint: coords = [10, 1],
  i = 0,
): coords {
  if (!data[i]) return ship;
  const [action, amount] = data[i];
  const [x, y] = waypoint;

  switch (action) {
    case "N":
      waypoint = [x, y + amount];
      break;
    case "S":
      waypoint = [x, y - amount];
      break;
    case "E":
      waypoint = [x + amount, y];
      break;
    case "W":
      waypoint = [x - amount, y];
      break;
    case "L":
      waypoint = rotate(waypoint, amount * -1);
      break;
    case "R":
      waypoint = rotate(waypoint, amount);
      break;
    case "F":
      ship = [ship[0] + (x * amount), ship[1] + (y * amount)];
      break;
  }
  return readInstructions(data, ship, waypoint, i + 1);
}

const destination = readInstructions(data);
const result = Math.abs(destination[0]) + Math.abs(destination[1]);

console.log(result);
