export function readInputToString() {
  const input = Deno.readTextFileSync("input.txt");
  return input.trim().split("\n");
}

export function readInput() {
  const input = Deno.readTextFileSync("input.txt");
  return input.trim().split("\n").map(Number);
}
