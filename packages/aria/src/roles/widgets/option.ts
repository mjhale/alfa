import { Role } from "../../types";
import * as Attributes from "../../attributes";
import { Input } from "../abstract";
import { ListBox } from "../widgets";

/**
 * @see https://www.w3.org/TR/wai-aria/#option
 */
export const Option: Role = {
  name: "option",
  label: { from: ["author", "contents"], required: true },
  inherits: [Input],
  context: [ListBox],
  required: [Attributes.Selected],
  supported: [
    Attributes.Checked,
    Attributes.PositionInSet,
    Attributes.SetSize
  ]
};