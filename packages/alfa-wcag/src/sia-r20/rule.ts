import { Atomic } from "@siteimprove/alfa-act";
import { Attributes } from "@siteimprove/alfa-aria";
import {
  Attribute,
  Document,
  isElement,
  querySelectorAll
} from "@siteimprove/alfa-dom";
import { values } from "@siteimprove/alfa-util";

function concat<T>(a: Array<T>, b: Array<T>): Array<T> {
  return a.concat(b);
}

export const SIA_R20: Atomic.Rule<Document, Attribute> = {
  id: "sanshikan:rules/sia-r20.html",
  requirements: [{ id: "wcag:name-role-value", partial: true }],
  definition: (applicability, expectations, { document }) => {
    const attributeNames = new Set(
      values(Attributes).map(attribute => attribute.name)
    );

    applicability(document, () =>
      querySelectorAll(document, document, isElement)
        .map(element =>
          Array.from(element.attributes).filter(attribute =>
            attribute.localName.startsWith("aria-")
          )
        )
        .reduce(concat, [])
    );

    expectations((aspect, target, expectation) => {
      expectation(1, attributeNames.has(target.localName));
    });
  }
};
