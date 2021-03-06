import { parse } from "@siteimprove/alfa-lang";
import { Converters } from "../../../converters";
import { Longhand } from "../../../properties";
import { Resolvers } from "../../../resolvers";
import { Units } from "../../../units";
import { Values, ValueType } from "../../../values";
import {
  getComputedProperty,
  getSpecifiedProperty
} from "../../helpers/get-property";
import {
  AbsoluteFontSize,
  FontFamily,
  FontSize,
  RelativeFontSize
} from "../types";
import { FontSizeGrammar } from "./grammar";

/**
 * @see https://www.w3.org/TR/css-fonts/#propdef-font-size
 */
export const fontSize: Longhand<FontSize, Values.Length<"px">> = {
  inherits: true,
  depends: ["fontFamily"],
  parse(input) {
    const parser = parse(input, FontSizeGrammar);

    if (!parser.done) {
      return null;
    }

    return parser.result;
  },
  initial() {
    return Values.length(16, "px");
  },
  computed(style, device) {
    const value = getSpecifiedProperty(style, "fontSize");
    const parentValue = getComputedProperty(style.parent, "fontSize");

    switch (value.type) {
      case ValueType.Keyword:
        switch (value.value) {
          case "xx-small":
          case "x-small":
          case "small":
          case "medium":
          case "large":
          case "x-large":
          case "xx-large":
            return resolveAbsoluteFontSize(
              value,
              getComputedProperty(style, "fontFamily")
            );
        }

        return resolveRelativeFontSize(value, parentValue);

      case ValueType.Length:
        return Resolvers.length(value, device, style);

      case ValueType.Percentage:
        return Resolvers.percentage(value, parentValue, device, style);
    }
  }
};

function resolveAbsoluteFontSize(
  { value }: AbsoluteFontSize,
  fontFamily: FontFamily
): Values.Length<"px"> {
  let factor: number;

  switch (value) {
    case "xx-small":
      factor = 3 / 5;
      break;
    case "x-small":
      factor = 3 / 4;
      break;
    case "small":
      factor = 8 / 9;
      break;
    case "medium":
    default:
      factor = 1;
      break;
    case "large":
      factor = 6 / 5;
      break;
    case "x-large":
      factor = 3 / 2;
      break;
    case "xx-large":
      factor = 2;
  }

  const base = fontFamily.value[0].value === "monospace" ? 13 : 16;

  return Values.length(Math.round(factor * base), "px");
}

function resolveRelativeFontSize(
  { value }: RelativeFontSize,
  { value: parentValue, unit }: Values.Length<Units.AbsoluteLength>
): Values.Length<"px"> {
  switch (value) {
    case "smaller":
      return Values.length(
        Converters.length(parentValue / 1.2, unit, "px"),
        "px"
      );
    case "larger":
      return Values.length(
        Converters.length(parentValue * 1.2, unit, "px"),
        "px"
      );
  }
}
