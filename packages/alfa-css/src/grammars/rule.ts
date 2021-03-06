import * as Lang from "@siteimprove/alfa-lang";
import { Grammar, skip, Stream } from "@siteimprove/alfa-lang";
import { Token, Tokens, TokenType } from "../alphabet";
import { AtRule, QualifiedRule, Rule } from "../types";

const { isArray } = Array;

/**
 * @see https://www.w3.org/TR/css-syntax/#consume-an-at-rule
 */
function atRule(stream: Stream<Token>, name: string): AtRule {
  const prelude: Array<Token> = [];

  let next = stream.peek(0);

  while (next !== null && next.type !== TokenType.Semicolon) {
    if (next.type === TokenType.LeftCurlyBracket) {
      return {
        name,
        prelude,
        value: block(stream)
      };
    }

    prelude.push(next);

    stream.advance(1);
    next = stream.peek(0);
  }

  stream.advance(1);

  return {
    name,
    prelude
  };
}

/**
 * @see https://www.w3.org/TR/css-syntax/#consume-a-qualified-rule
 */
function qualifiedRule(
  stream: Stream<Token>,
  prelude: Array<Token>
): QualifiedRule | null {
  let next = stream.peek(0);

  while (next !== null) {
    if (next.type === TokenType.LeftCurlyBracket) {
      return {
        prelude,
        value: block(stream)
      };
    }

    prelude.push(next);

    stream.advance(1);
    next = stream.peek(0);
  }

  return null;
}

function block(stream: Stream<Token>): Array<Token> {
  const values: Array<Token> = [];

  stream.advance(1);
  let next = stream.peek(0);

  while (next !== null && next.type !== TokenType.RightCurlyBracket) {
    values.push(next);
    stream.advance(1);
    next = stream.peek(0);
  }

  if (next !== null && next.type === TokenType.RightCurlyBracket) {
    stream.advance(1);
  }

  return values;
}

function rule(token: Token, stream: Stream<Token>): Rule | null {
  if (token.type === TokenType.AtKeyword) {
    return atRule(stream, token.value);
  }

  return qualifiedRule(stream, [token]);
}

function ruleList(
  stream: Stream<Token>,
  expression: () => Rule | Array<Rule> | null,
  left: Rule | Array<Rule>
): Array<Rule> {
  stream.backup(1);

  const rules: Array<Rule> = [];

  if (isArray(left)) {
    rules.push(...left);
  } else {
    rules.push(left);
  }

  const right = expression();

  if (right !== null) {
    if (isArray(right)) {
      rules.push(...right);
    } else {
      rules.push(right);
    }
  }

  return rules;
}

type Production<T extends Token> = Lang.Production<
  Token,
  Rule | Array<Rule>,
  T
>;

const ident: Production<Tokens.Ident> = {
  token: TokenType.Ident,
  prefix(token, stream) {
    return rule(token, stream);
  },
  infix(token, stream, expression, left) {
    return ruleList(stream, expression, left);
  }
};

const delim: Production<Tokens.Delim> = {
  token: TokenType.Delim,
  prefix(token, stream) {
    return rule(token, stream);
  },
  infix(token, stream, expression, left) {
    return ruleList(stream, expression, left);
  }
};

const hash: Production<Tokens.Hash> = {
  token: TokenType.Hash,
  prefix(token, stream) {
    return rule(token, stream);
  },
  infix(token, stream, expression, left) {
    return ruleList(stream, expression, left);
  }
};

const colon: Production<Tokens.Colon> = {
  token: TokenType.Colon,
  prefix(token, stream) {
    return rule(token, stream);
  },
  infix(token, stream, expression, left) {
    return ruleList(stream, expression, left);
  }
};

const squareBracket: Production<Tokens.SquareBracket> = {
  token: TokenType.LeftSquareBracket,
  prefix(token, stream) {
    return rule(token, stream);
  },
  infix(token, stream, expression, left) {
    return ruleList(stream, expression, left);
  }
};

const atKeyword: Production<Tokens.AtKeyword> = {
  token: TokenType.AtKeyword,
  prefix(token, stream) {
    return rule(token, stream);
  },
  infix(token, stream, expression, left) {
    return ruleList(stream, expression, left);
  }
};

export const RuleGrammar: Grammar<Token, Rule | Array<Rule>> = new Grammar(
  [
    skip(TokenType.Whitespace),
    ident,
    hash,
    delim,
    colon,
    squareBracket,
    atKeyword
  ],
  () => null
);
