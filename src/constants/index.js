/**
 * Application Constants
 */
import { APP_CATEGORIES } from "./apps";
export { APP_CATEGORIES };

export const ACTIONS = {
  AUTH: {
    LOAD_PROFILE: "LOAD_PROFILE",
    SET_PROFILE_PHOTO: "SET_PROFILE_PHOTO",
    SET_TOKEN_V3: "SET_TOKEN_V3",
    SET_TOKEN_V2: "SET_TOKEN_V2",
    SET_INITIALIZED: "SET_INITIALIZED",
  },
  MENU: {
    SET_APP_MENU: "SET_APP_MENU",
    DISABLE_SIDEBAR_FOR_ROUTE: "DISABLE_SIDEBAR_FOR_ROUTE",
    ENABLE_SIDEBAR_FOR_ROUTE: "ENABLE_SIDEBAR_FOR_ROUTE",
    DISABLE_NAVIGATION_FOR_ROUTE: "DISABLE_NAVIGATION_FOR_ROUTE",
    ENABLE_NAVIGATION_FOR_ROUTE: "ENABLE_NAVIGATION_FOR_ROUTE",
  },
};
