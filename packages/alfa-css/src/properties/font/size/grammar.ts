import * as Lang from "@siteimprove/alfa-lang";
import { Grammar, skip } from "@siteimprove/alfa-lang";
import { Token, Tokens, TokenType } from "../../../alphabet";
import { Units } from "../../../units";
import { Values } from "../../../values";
import { FontSize } from "../types";

type Production<T extends Token> = Lang.Production<Token, FontSize, T>;

const ident: Production<Tokens.Ident> = {
  token: TokenType.Ident,
  prefix(token) {
    switch (token.value) {
      case "xx-small":
      case "x-small":
      case "small":
      case "medium":
      case "large":
      case "x-large":
      case "xx-large":
        return Values.keyword(token.value);

      case "smaller":
      case "larger":
        return Values.keyword(token.value);
    }

    return null;
  }
};

const dimension: Production<Tokens.Dimension> = {
  token: TokenType.Dimension,
  prefix(token) {
    if (Units.isLength(token.unit)) {
      return Values.length(token.value, token.unit);
    }

    return null;
  }
};

const percentage: Production<Tokens.Percentage> = {
  token: TokenType.Percentage,
  prefix(token) {
    return Values.percentage(token.value);
  }
};

export const FontSizeGrammar: Grammar<Token, FontSize> = new Grammar(
  [skip(TokenType.Whitespace), ident, dimension, percentage],
  () => null
);
