/**
 * NB: Notice that we explicitly do NOT define the `parentNode` property. There
 * is a very good reason for this: Serialization. Since `parentNode` introduces
 * a circular reference, serialization becomes tricky as there's no way to
 * handle circular references in JSON without relying on non-standard methods.
 * As we want Alfa to be agnostic to where it receives DOM structures from, we
 * must make sure that this DOM structure can be serialized to and from JSON
 * without any additional work.
 *
 * The consequence of not storing parent pointers is that for all methods that
 * must move up the DOM tree, an associated context node must also be passed.
 * From this context node we can then build a parent pointer tree in order to
 * provide access to parent nodes in amortized constant time. When moving down
 * the DOM tree, we get access to parent pointers for free.
 *
 * @see https://www.w3.org/TR/dom/#interface-node
 */
export interface Node {
  /**
   * @see https://www.w3.org/TR/dom/#dom-node-nodetype
   */
  readonly nodeType: number;

  /**
   * @see https://www.w3.org/TR/dom/#dom-node-childnodes
   */
  readonly childNodes: ArrayLike<Node>;
}

/**
 * @see https://www.w3.org/TR/dom/#interface-characterdata
 */
export interface CharacterData extends Node {
  /**
   * @see https://www.w3.org/TR/dom/#dom-characterdata-data
   */
  readonly data: string;
}

/**
 * @see https://www.w3.org/TR/dom/#interface-attr
 */
export interface Attribute {
  /**
   * @see https://www.w3.org/TR/dom/#dom-attr-namespaceuri
   */
  readonly namespaceURI: string | null;

  /**
   * @see https://www.w3.org/TR/dom/#dom-attr-prefix
   */
  readonly prefix: string | null;

  /**
   * @see https://www.w3.org/TR/dom/#dom-attr-localname
   */
  readonly localName: string;

  /**
   * @see https://www.w3.org/TR/dom/#dom-attr-value
   */
  readonly value: string;
}

/**
 * @see https://www.w3.org/TR/dom/#interface-element
 */
export interface Element extends Node {
  /**
   * @see https://www.w3.org/TR/dom/#dom-node-element_node
   */
  readonly nodeType: 1;

  /**
   * @see https://www.w3.org/TR/dom/#dom-element-namespaceuri
   */
  readonly namespaceURI: string | null;

  /**
   * @see https://www.w3.org/TR/dom/#dom-element-prefix
   */
  readonly prefix: string | null;

  /**
   * @see https://www.w3.org/TR/dom/#dom-element-localname
   */
  readonly localName: string;

  /**
   * @see https://www.w3.org/TR/dom/#dom-element-attributes
   */
  readonly attributes: ArrayLike<Attribute>;

  /**
   * @see https://www.w3.org/TR/dom41/#dom-element-shadowroot
   */
  readonly shadowRoot: ShadowRoot | null;
}

/**
 * @see https://www.w3.org/TR/dom/#interface-text
 */
export interface Text extends CharacterData {
  /**
   * @see https://www.w3.org/TR/dom/#dom-node-text_node
   */
  readonly nodeType: 3;
}

/**
 * @see https://www.w3.org/TR/dom/#interface-comment
 */
export interface Comment extends CharacterData {
  readonly nodeType: 8;
}

/**
 * @see https://www.w3.org/TR/dom/#interface-document
 */
export interface Document extends Node {
  /**
   * @see https://www.w3.org/TR/dom/#dom-node-document_node
   */
  readonly nodeType: 9;

  /**
   * @see https://www.w3.org/TR/cssom/#dom-document-stylesheets
   */
  readonly styleSheets: ArrayLike<StyleSheet>;
}

/**
 * @see https://www.w3.org/TR/dom/#interface-documenttype
 */
export interface DocumentType extends Node {
  /**
   * @see https://www.w3.org/TR/dom/#dom-node-document_type_node
   */
  readonly nodeType: 10;

  /**
   * @see https://www.w3.org/TR/dom/#dom-documenttype-name
   */
  readonly name: string;
}

/**
 * @see https://www.w3.org/TR/dom/#interface-documentfragment
 */
export interface DocumentFragment extends Node {
  /**
   * @see https://www.w3.org/TR/dom/#dom-node-document_fragment_node
   */
  readonly nodeType: 11;
}

/**
 * @see https://www.w3.org/TR/dom41/#interface-shadowroot
 */
export interface ShadowRoot extends DocumentFragment {}

/**
 * @see https://www.w3.org/TR/cssom/#cssstylesheet
 */
export interface StyleSheet {
  /**
   * @see https://www.w3.org/TR/cssom/#dom-cssstylesheet-cssrules
   */
  readonly cssRules: ArrayLike<Rule>;
}

/**
 * @see https://www.w3.org/TR/cssom/#cssstyledeclaration
 */
export interface StyleDeclaration {
  /**
   * @see https://www.w3.org/TR/cssom/#dom-cssstyledeclaration-csstext
   */
  readonly cssText: string;
}

/**
 * @see https://www.w3.org/TR/cssom/#cssrule
 */
export interface Rule {
  /**
   * @see https://www.w3.org/TR/cssom/#dom-cssrule-type
   */
  readonly type: number;
}

/**
 * @see https://www.w3.org/TR/cssom/#cssgroupingrule
 */
export interface GroupingRule extends Rule {
  /**
   * @see https://www.w3.org/TR/cssom/#dom-cssgroupingrule-cssrules
   */
  readonly cssRules: ArrayLike<Rule>;
}

/**
 * @see https://www.w3.org/TR/css-conditional/#cssconditionrule
 */
export interface ConditionRule extends GroupingRule {
  /**
   * @see https://www.w3.org/TR/css-conditional/#dom-cssconditionrule-conditiontext
   */
  readonly conditionText: string;
}

/**
 * @see https://www.w3.org/TR/cssom/#cssstylerule
 */
export interface StyleRule extends Rule {
  /**
   * @see https://www.w3.org/TR/cssom/#dom-cssrule-style_rule
   */
  readonly type: 1;

  /**
   * @see https://www.w3.org/TR/cssom/#dom-cssstylerule-selectortext
   */
  readonly selectorText: string;

  /**
   * @see https://www.w3.org/TR/cssom/#dom-cssstylerule-style
   */
  readonly style: StyleDeclaration;
}

/**
 * @see https://www.w3.org/TR/cssom/#cssimportrule
 */
export interface ImportRule extends Rule {
  /**
   * @see https://www.w3.org/TR/cssom/#dom-cssrule-import_rule
   */
  readonly type: 3;

  /**
   * @see https://www.w3.org/TR/cssom/#dom-cssimportrule-href
   */
  readonly href: string;

  /**
   * @see https://www.w3.org/TR/cssom/#dom-cssimportrule-media
   */
  readonly media: ArrayLike<string>;

  /**
   * @see https://www.w3.org/TR/cssom/#dom-cssimportrule-stylesheet
   */
  readonly styleSheet: StyleSheet;
}

/**
 * @see https://www.w3.org/TR/cssom/#cssmediarule
 */
export interface MediaRule extends GroupingRule {
  /**
   * @see https://www.w3.org/TR/cssom/#dom-cssrule-media_rule
   */
  readonly type: 4;

  /**
   * @see https://www.w3.org/TR/cssom/#dom-cssmediarule-media
   */
  readonly media: ArrayLike<string>;
}

/**
 * @see https://www.w3.org/TR/css-fonts/#cssfontfacerule
 */
export interface FontFaceRule extends Rule {
  /**
   * @see https://www.w3.org/TR/cssom/#dom-cssrule-font_face_rule
   */
  readonly type: 5;

  /**
   * @see https://www.w3.org/TR/css-fonts/#dom-cssfontfacerule-style
   */
  readonly style: StyleDeclaration;
}

/**
 * NB: While the specification states that the `CSSPageRule` interface extends
 * `CSSGroupingRule`, this is in practice not the case; in current browser
 * implementations, it extends `CSSRule`.
 *
 * @see https://www.w3.org/TR/cssom/#csspagerule
 */
export interface PageRule extends Rule {
  /**
   * @see https://www.w3.org/TR/cssom/#dom-cssrule-page_rule
   */
  readonly type: 6;

  /**
   * @see https://www.w3.org/TR/cssom/#dom-csspagerule-selectortext
   */
  readonly selectorText: string;

  /**
   * @see https://www.w3.org/TR/cssom/#dom-csspagerule-style
   */
  readonly style: StyleDeclaration;
}

/**
 * @see https://www.w3.org/TR/css-animations/#csskeyframesrule
 */
export interface KeyframesRule extends Rule {
  /**
   * @see https://www.w3.org/TR/css-animations/#dom-cssrule-keyframes_rule
   */
  readonly type: 7;

  /**
   * @see https://www.w3.org/TR/css-animations/#dom-csskeyframesrule-name
   */
  readonly name: string;

  /**
   * @see https://www.w3.org/TR/css-animations/#dom-csskeyframesrule-cssrules
   */
  readonly cssRules: ArrayLike<Rule>;
}

/**
 * @see https://www.w3.org/TR/css-animations/#csskeyframerule
 */
export interface KeyframeRule extends Rule {
  /**
   * @see https://www.w3.org/TR/css-animations/#dom-cssrule-keyframe_rule
   */
  readonly type: 8;

  /**
   * @see https://www.w3.org/TR/css-animations/#dom-csskeyframerule-keytext
   */
  readonly keyText: string;

  /**
   * @see https://www.w3.org/TR/css-animations/#dom-csskeyframerule-style
   */
  readonly style: StyleDeclaration;
}

/**
 * @see https://www.w3.org/TR/cssom/#cssnamespacerule
 */
export interface NamespaceRule extends Rule {
  /**
   * @see https://www.w3.org/TR/cssom/#dom-cssrule-namespace_rule
   */
  readonly type: 10;

  /**
   * @see https://www.w3.org/TR/cssom/#dom-cssnamespacerule-namespaceuri
   */
  readonly namespaceURI: string;

  /**
   * @see https://www.w3.org/TR/cssom/#dom-cssnamespacerule-prefix
   */
  readonly prefix: string;
}

/**
 * @see https://www.w3.org/TR/css-conditional/#csssupportsrule
 */
export interface SupportsRule extends ConditionRule {
  /**
   * @see https://www.w3.org/TR/css-conditional/#dom-cssrule-supports_rule
   */
  readonly type: 12;
}