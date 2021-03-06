import { Atomic } from "@siteimprove/alfa-act";
import {
  getTextAlternative,
  hasTextAlternative,
  isExposed
} from "@siteimprove/alfa-aria";
import { some } from "@siteimprove/alfa-compatibility";
import { Device } from "@siteimprove/alfa-device";
import {
  Document,
  Element,
  getAttribute,
  getElementNamespace,
  isElement,
  Namespace,
  Node,
  querySelectorAll
} from "@siteimprove/alfa-dom";

export const SIA_R15: Atomic.Rule<Device | Document, Element> = {
  id: "sanshikan:rules/sia-r15.html",
  requirements: [{ id: "wcag:name-role-value", partial: true }],
  definition: (applicability, expectations, { device, document }) => {
    const iframes = querySelectorAll<Element>(
      document,
      document,
      node =>
        isElement(node) &&
        isIframe(node, document) &&
        some(isExposed(node, document, device)) &&
        hasTextAlternative(node, document, device)
    );

    applicability(document, () => [...iframes]);

    expectations((aspect, target, expectation) => {
      expectation(
        1,
        some(
          getTextAlternative(target, document, device),
          textAlternative =>
            iframes.find(
              found =>
                found !== target &&
                getAttribute(found, "src") !== getAttribute(target, "src") &&
                some(
                  getTextAlternative(found, document, device),
                  otherTextAlternative =>
                    otherTextAlternative !== null &&
                    otherTextAlternative.trim().toLowerCase() ===
                      textAlternative!.trim().toLowerCase()
                )
            ) === undefined
        )
      );
    });
  }
};

function isIframe(element: Element, context: Node): boolean {
  return (
    getElementNamespace(element, context) === Namespace.HTML &&
    element.localName === "iframe"
  );
}
