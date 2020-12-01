export function readInput() {
  const input = Deno.readTextFileSync("input.txt");
  return input.trim().split("\n").map(Number);
}
