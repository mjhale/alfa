import { Category, Role } from "../../types";
import { Landmark } from "../abstract/landmark";

/**
 * @see https://www.w3.org/TR/wai-aria/#form
 */
export const Form: Role = {
  name: "form",
  category: Category.Landmark,
  inherits: () => [Landmark],
  label: { from: ["author"] }
};
