import { isComposite } from "./guards";
import { Aspect, Rule, Target } from "./types";

/**
 * @internal
 */
export function sortRules<A extends Aspect, T extends Target>(
  rules: ReadonlyArray<Rule<A, T>>
): ReadonlyArray<Rule<A, T>> {
  const result: Array<Rule<A, T>> = [];

  const indegrees = new WeakMap<Rule<A, T>, number>();

  for (const rule of rules) {
    if (isComposite(rule)) {
      for (const neighbour of rule.composes) {
        const indegree = indegrees.get(neighbour);

        if (indegree === undefined) {
          indegrees.set(neighbour, 1);
        } else {
          indegrees.set(neighbour, indegree + 1);
        }
      }
    }
  }

  const leaves = rules.filter(rule => !indegrees.has(rule));

  let next = leaves.pop();

  while (next !== undefined) {
    result.unshift(next);

    if (isComposite(next)) {
      for (const neighbour of next.composes) {
        const indegree = indegrees.get(neighbour);

        if (indegree === undefined) {
          continue;
        }

        indegrees.set(neighbour, indegree - 1);

        if (indegree === 1) {
          leaves.push(neighbour);
        }
      }
    }

    next = leaves.pop();
  }

  return result;
}
