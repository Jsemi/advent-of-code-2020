export function readInput() {
  const input = Deno.readTextFileSync("input.txt");
  return input.trim().split("\n").map((e) => {
    const [, action, value] = e.match(/^([A-Z])([0-9]+)$/) || [];
    return [action, Number(value)] as instruction;
  });
}

const data = readInput();

export type instruction = [string, number];
type position = [number, number, number];

function turnShip(direction: number, amount: number) {
  const adjusted = direction + amount;
  if (adjusted === 360) return 0;
  if (adjusted > 360) return adjusted - 360;
  if (adjusted < 0) return adjusted + 360;
  return adjusted;
}

function readInstructions(
  data: instruction[],
  ship: position = [0, 0, 90],
  i = 0,
): position {
  if (!data[i]) return ship;
  const [action, amount] = data[i];
  const [x, y, direction] = ship;

  switch (action) {
    case "N":
      ship = [x, y + amount, direction];
      break;
    case "S":
      ship = [x, y - amount, direction];
      break;
    case "E":
      ship = [x + amount, y, direction];
      break;
    case "W":
      ship = [x - amount, y, direction];
      break;
    case "L":
      ship = [x, y, turnShip(direction, amount * -1)];
      break;
    case "R":
      ship = [x, y, turnShip(direction, amount)];
      break;
    case "F":
      switch (direction) {
        case 0:
          ship = [x, y + amount, direction];
          break;
        case 90:
          ship = [x + amount, y, direction];
          break;
        case 180:
          ship = [x, y - amount, direction];
          break;
        case 270:
          ship = [x - amount, y, direction];
          break;
      }
      break;
  }

  return readInstructions(data, ship, i + 1);
}

const destination = readInstructions(data);
const result = Math.abs(destination[0]) + Math.abs(destination[1]);

console.log(result);
