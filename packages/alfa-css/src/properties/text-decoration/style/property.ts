import { parse } from "@siteimprove/alfa-lang";
import { Longhand } from "../../../properties";
import { Values } from "../../../values";
import { getSpecifiedProperty } from "../../helpers/get-property";
import { TextDecorationStyle } from "../types";
import { TextDecorationStyleGrammar } from "./grammar";

const { keyword } = Values;

/**
 * @see https://www.w3.org/TR/css-text-decor-3/#text-decoration-style-property
 */
export const textDecorationStyle: Longhand<TextDecorationStyle> = {
  parse(input) {
    const parser = parse(input, TextDecorationStyleGrammar);

    if (!parser.done) {
      return null;
    }

    return parser.result;
  },
  initial() {
    return keyword("none");
  },
  computed(style) {
    return getSpecifiedProperty(style, "textDecorationStyle");
  }
};
