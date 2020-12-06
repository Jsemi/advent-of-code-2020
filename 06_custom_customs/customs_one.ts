export function readInput() {
  const input = Deno.readTextFileSync("input.txt");
  return input.trim().split("\n\n").map((e) => e.replace(/\n/g, ""));
}

const data = readInput();

function uniqAnswers(str: string) {
  return new Set(str).size;
}

const result = data.map(uniqAnswers).reduce((a, b) => a + b, 0);

console.log(result);
