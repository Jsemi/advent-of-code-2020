import { readInputToString } from "../helpers.ts";

const data = readInputToString();

function parseRow(str: string) {
  return str.match(/(\d+)-(\d+) (\w): (\w+)/) || [];
}

function isValidPassword(entry: string[]) {
  const [, min, max, letter, password] = entry;
  const re = RegExp(letter, "g");
  const letterCount = password.match(re)?.length || 0;
  const isValid = letterCount >= Number(min) && letterCount <= Number(max);
  return isValid;
}

export function validatePassword(
  validator: (entry: string[]) => boolean,
  data: string[],
) {
  return data.reduce(
    (acc, entry) => validator(parseRow(entry)) ? acc + 1 : acc,
    0,
  );
}

const result = validatePassword(isValidPassword, data);

console.log(result);
