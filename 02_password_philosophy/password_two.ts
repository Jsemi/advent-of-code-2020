import { readInputToString } from "../helpers.ts";
import { validatePassword } from "./password_one.ts";

const data = readInputToString();

function isValidPassword(entry: string[]) {
  const [, pos1, pos2, letter, password] = entry;
  const firstLetter = password.charAt(Number(pos1) - 1);
  const secondLetter = password.charAt(Number(pos2) - 1);
  const isValid = firstLetter != secondLetter &&
    (firstLetter == letter || secondLetter == letter);
  return isValid;
}

const result = validatePassword(isValidPassword, data);

console.log(result);
