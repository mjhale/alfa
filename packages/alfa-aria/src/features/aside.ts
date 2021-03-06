import * as Roles from "../roles";
import { Feature } from "../types";

/**
 * @see https://www.w3.org/TR/html-aria/#aside
 */
export const Aside: Feature = {
  element: "aside",
  role: () => Roles.Complementary,
  allowedRoles: () => [
    Roles.Feed,
    Roles.Note,
    Roles.Presentation,
    Roles.None,
    Roles.Region,
    Roles.Search
  ]
};
