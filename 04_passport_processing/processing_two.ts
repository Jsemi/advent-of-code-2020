import {
  countValidPassports,
  Passport,
  processPassport,
  readInput,
} from "./processing_one.ts";

const data = readInput();

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
