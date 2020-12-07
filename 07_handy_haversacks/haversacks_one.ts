import { readInputToString } from "../helpers.ts";

const data = readInputToString();

export type Bag = [number, string];

function getInnerColors(rest: string) {
  return rest === "no other bags" ? [] : rest.split(", ").map((others) => {
    const [, count, color] = others.match(/(\d+) (\w+ \w+) bags?/) || [];
    return [Number(count), color];
  });
}

export function mapRules(data: string[]) {
  return data.reduce((rules, row) => {
    const [, color, rest] = row.match(/(\w+ \w+) bags contain (.*)\./) || [];
    rules.set(color, []);

    const innerColors = getInnerColors(rest);
    innerColors.forEach((inner) => rules.get(color).push(inner));

    return rules;
  }, new Map());
}

function traverse(rules: Map<string, Bag[]>, bag: string[]) {
  const entry = rules.get(bag[0]) || [];
  const colors = entry.reduce((acc, [, color]) => {
    acc.push(...traverse(rules, [color]));
    return acc;
  }, [...bag]);
  return colors;
}

const rules = mapRules(data);
const result =
  [...rules.keys()].filter((key) =>
    traverse(rules, [key]).includes("shiny gold")
  ).length - 1;

console.log(result);
