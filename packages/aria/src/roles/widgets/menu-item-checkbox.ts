import { Role } from "../../types";
import * as Attributes from "../../attributes";
import { Command } from "../abstract";
import { Checkbox, Menu, MenuItem, MenuBar } from "../widgets";

/**
 * @see https://www.w3.org/TR/wai-aria/#menuitemcheckbox
 */
export const MenuItemCheckbox: Role = {
  name: "menuitemcheckbox",
  label: { from: ["author", "contents"], required: true },
  inherits: [Checkbox, MenuItem],
  context: [Menu, MenuBar]
};