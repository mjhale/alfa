import { Atomic } from "@siteimprove/alfa-act";
import {
  Document,
  Element,
  getElementNamespace,
  isElement,
  Namespace,
  Node,
  querySelectorAll
} from "@siteimprove/alfa-dom";

export const SIA_R23: Atomic.Rule<Document, Element> = {
  id: "sanshikan:rules/sia-r23.html",
  requirements: [{ id: "wcag:captions-prerecorded", partial: true }],
  definition: (applicability, expectations, { document }) => {
    applicability(() =>
      querySelectorAll(
        document,
        document,
        node => isElement(node) && isAudio(node, document)
      )
    );

    expectations((target, expectation, question) => {
      expectation(1, question("has-captions"));
    });
  }
};

function isAudio(element: Element, context: Node): boolean {
  return (
    getElementNamespace(element, context) === Namespace.HTML &&
    element.localName === "audio"
  );
}