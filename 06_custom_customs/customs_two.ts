export function readInput() {
  const input = Deno.readTextFileSync("input.txt");
  return input.trim().split("\n\n");
}

const data = readInput();

function countAnswers(str: string) {
  const group = [...str.replace(/\n/g, "")];
  const uniq = [...new Set(group)];
  const answers =
    uniq.filter((char) => str.split("\n").every((form) => form.includes(char)))
      .length;
  return answers;
}

const result = data.map(countAnswers).reduce((a, b) => a + b, 0);

console.log(result);
