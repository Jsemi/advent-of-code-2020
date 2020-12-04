export function readInput() {
  const input = Deno.readTextFileSync("input.txt");
  return input.trim().split("\n\n");
}

const data = readInput();

export interface Passport {
  byr: number;
  iyr: number;
  eyr: number;
  hgt: string;
  hcl: string;
  ecl: string;
  pid: string;
  cid?: string;
}

export function processPassport(data: string[]): Passport[] {
  const formattedData = data.map((entry) => {
    const row = entry.split(/ |\n/).map((row) => row.split(":"));
    return Object.fromEntries(row);
  });
  return formattedData;
}

export function validatePassport(passport: Passport) {
  const keys = Object.keys(passport);
  return keys.length === 8 || keys.length === 7 && !keys.includes("cid");
}

export function countValidPassports(
  validationFn: (passport: Passport) => boolean,
  data: Passport[],
) {
  return data.reduce((acc, entry) => {
    const isValid = validationFn(entry);
    return isValid ? acc + 1 : acc;
  }, 0);
}

const processedData = processPassport(data);
const result = countValidPassports(validatePassport, processedData);

console.log(result);
