function readInput() {
  const input = Deno.readTextFileSync("input.txt");
  return input.split("\n")[1]
    .split(",")
    .map((n, i) => [i, Number(n)])
    .filter(([, n]) => !Number.isNaN(n));
}

const data = readInput();

function findTimestamp(data: number[][]) {
  const [head, ...buses] = data;
  let multiplier = head[1];
  let time = 0;
  for (const [idx, bus] of buses) {
    while (true) {
      if ((time + idx) % bus === 0) {
        multiplier *= bus;
        break;
      }
      time += multiplier;
    }
  }
  return time;
}

const result = findTimestamp(data);

console.log(result);
