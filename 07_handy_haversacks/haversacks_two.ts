import { readInputToString } from "../helpers.ts";
import { Bag, mapRules } from "./haversacks_one.ts";

const data = readInputToString();

function traverse(rules: Map<string, Bag[]>, bag: string): number {
  const entry = rules.get(bag) || [];
  const total = entry.reduce(
    (acc, [count, color]) => acc += count + count * traverse(rules, color),
    0,
  );
  return total;
}

const rules = mapRules(data);
const result = traverse(rules, "shiny gold");

console.log(result);
