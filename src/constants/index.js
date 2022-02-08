/**
 * Application Constants
 */
/* global process */
import { APP_CATEGORIES } from "./apps";
export { APP_CATEGORIES };
import config from "../../config";

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

/**
 * Supported Button Sizes
 */
export const BUTTON_SIZE = {
  TINY: "tiny",
  SMALL: "small",
  MEDIUM: "medium",
};

/**
 * Supported Button Types
 */
export const BUTTON_TYPE = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  WARNING: "warning",
  ROUNDED: "rounded",
  TEXT: "text",
  TEXT_INVERTED: "text-inverted",
};

export const PLATFORM_DOMAIN =
  process.env.APPENV === "local"
    ? window.location.origin
    : config.URL.PLATFORM_DOMAIN;

export const PATH_REG_SOURCE_MAP = [
  { path: "/earn/gigs", regSource: "gigs" },
  { path: "/earn/find/challenges", regSource: "challenges" },
];
