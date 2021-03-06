import {
  Comment,
  ConditionRule,
  Document,
  DocumentFragment,
  DocumentType,
  Element,
  FontFaceRule,
  GroupingRule,
  ImportRule,
  KeyframeRule,
  KeyframesRule,
  MediaRule,
  NamespaceRule,
  Node,
  PageRule,
  Rule,
  ShadowRoot,
  StyleRule,
  SupportsRule,
  Text
} from "./types";

export function isElement(node: Node): node is Element {
  return node.nodeType === 1;
}

export function isText(node: Node): node is Text {
  return node.nodeType === 3;
}

export function isComment(node: Node): node is Comment {
  return node.nodeType === 8;
}

export function isDocument(node: Node): node is Document {
  return node.nodeType === 9;
}

export function isDocumentType(node: Node): node is DocumentType {
  return node.nodeType === 10;
}

export function isDocumentFragment(node: Node): node is DocumentFragment {
  return node.nodeType === 11;
}

export function isShadowRoot(node: Node): node is ShadowRoot {
  return isDocumentFragment(node) && "mode" in node;
}

export function isGroupingRule(rule: Rule): rule is GroupingRule {
  return isConditionRule(rule);
}

export function isConditionRule(rule: Rule): rule is ConditionRule {
  return isMediaRule(rule) || isSupportsRule(rule);
}

export function isStyleRule(rule: Rule): rule is StyleRule {
  return rule.type === 1;
}

export function isImportRule(rule: Rule): rule is ImportRule {
  return rule.type === 3;
}

export function isMediaRule(rule: Rule): rule is MediaRule {
  return rule.type === 4;
}

export function isFontFaceRule(rule: Rule): rule is FontFaceRule {
  return rule.type === 5;
}

export function isPageRule(rule: Rule): rule is PageRule {
  return rule.type === 6;
}

export function isKeyframesRule(rule: Rule): rule is KeyframesRule {
  return rule.type === 7;
}

export function isKeyframeRule(rule: Rule): rule is KeyframeRule {
  return rule.type === 8;
}

export function isNamespaceRule(rule: Rule): rule is NamespaceRule {
  return rule.type === 10;
}

export function isSupportsRule(rule: Rule): rule is SupportsRule {
  return rule.type === 12;
}
