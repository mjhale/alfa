import { jsx } from "@siteimprove/alfa-jsx";
import { test } from "@siteimprove/alfa-test";
import { getParentNode } from "../src/get-parent-node";

test("Returns the parent of an element", t => {
  const child = <span class="child" />;
  const parent = <span class="parent">{child}</span>;

  t.equal(getParentNode(child, <div>{parent}</div>), parent);
});

test("Gets the correct parent depending on context", t => {
  const child = <span class="child" />;
  const parent1 = <span class="parent1">{child}</span>;
  const parent2 = <span class="parent2">{child}</span>;

  t.equal(getParentNode(child, <div>{parent1}</div>), parent1);
  t.equal(getParentNode(child, <div>{parent2}</div>), parent2);
});

test("Returns the composed parent of an element", t => {
  const child = <span class="child" />;

  const context = (
    <div>
      <shadow>{child}</shadow>
    </div>
  );

  const parent = context.shadowRoot;

  t.equal(getParentNode(child, context, { composed: true }), parent);
});

test("Returns the flattened parent of an element", t => {
  const child = <span class="child" />;
  const parent = (
    <span class="parent">
      <slot />
    </span>
  );

  const context = (
    <div>
      {child}
      <shadow>{parent}</shadow>
    </div>
  );

  t.equal(getParentNode(child, context, { flattened: true }), parent);
});
