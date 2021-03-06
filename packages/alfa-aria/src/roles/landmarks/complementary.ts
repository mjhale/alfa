import { Category, Role } from "../../types";
import { Landmark } from "../abstract/landmark";

/**
 * @see https://www.w3.org/TR/wai-aria/#complementary
 */
export const Complementary: Role = {
  name: "complementary",
  category: Category.Landmark,
  inherits: () => [Landmark],
  label: { from: ["author"] }
};
