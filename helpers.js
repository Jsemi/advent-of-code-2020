export async function readInput() {
  const input = await Deno.readTextFile("input.txt");
  return input.trim().split("\n").map((Number));
}
