import { Role } from "../../types";
import * as Attributes from "../../attributes";
import { Section } from "../abstract";

/**
 * @see https://www.w3.org/TR/wai-aria/#group
 */
export const Group: Role = {
  name: "group",
  label: { from: "author" },
  inherits: [Section],
  supported: [Attributes.ActiveDescendant]
};