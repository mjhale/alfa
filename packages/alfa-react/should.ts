import { createShouldPlugin } from "@siteimprove/alfa-should";
import { fromReactElement } from "./src/from-react-element";
import { isReactElement } from "./src/is-react-element";

export const Plugin = createShouldPlugin(isReactElement, fromReactElement);
