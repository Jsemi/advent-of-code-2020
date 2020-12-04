import {
  countValidPassports,
  Passport,
  processPassport,
  readInput,
} from "./processing_one.ts";

const data = readInput();

// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.

function validatePassport(passport: Passport) {
  const { byr, iyr, eyr, hgt, hcl, ecl, pid } = passport;
  const keys = Object.keys(passport);
  if (
    !(keys.length === 8 || keys.length === 7 && !keys.includes("cid"))
  ) {
    return false;
  }
  if (byr < 1920 || byr > 2002) return false;
  if (iyr < 2010 || iyr > 2020) return false;
  if (eyr < 2020 || eyr > 2030) return false;
  if (
    !hgt?.match(/^(59|6[0-9]|7[0-6])in$|^1([5-8][0-9]|9[0-3])cm$/)
  ) {
    return false;
  }
  if (!hcl?.match(/^#[0-9a-f]{6}$/)) return false;
  if (!ecl?.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/)) return false;
  if (!pid?.match(/^[0-9]{9}$/)) return false;
  return true;
}

const processedData = processPassport(data);

const result = countValidPassports(validatePassport, processedData);

console.log(result);
