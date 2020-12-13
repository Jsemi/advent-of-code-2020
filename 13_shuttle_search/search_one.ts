function readInput() {
  const input = Deno.readTextFileSync("input.txt");
  return input.replace(/,x/g, "")
    .replace(/,/g, "\n")
    .split("\n")
    .map(Number);
}

const data = readInput();

function findBus(data: number[], time: number): number {
  const [now, ...buses] = data;
  const busId = buses.find((bus) => time % bus === 0);
  if (!busId) return findBus(data, time + 1);
  return (time - now) * busId;
}

const result = findBus(data, data[0]);

console.log(result);
