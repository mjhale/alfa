import * as Roles from "../roles";
import { Any, Feature } from "../types";

/**
 * @see https://www.w3.org/TR/html-aria/#text-level-semantics
 */
export const Rp: Feature = {
  element: "rp",
  allowedRoles: () => Any(Roles)
};
