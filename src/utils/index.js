import _ from "lodash";
import moment from "moment";
import config from "../../config";
import { PATH_REG_SOURCE_MAP } from "../constants";

/**
 * Generate Logout URL
 */
export const getLogoutUrl = () =>
  `${config.URL.AUTH}/?logout=true&retUrl=${encodeURIComponent(
    "https://" + window.location.host
  )}`;

/**
 * Generate Profiles URL
 */
export const getProfileUrl = (handle) =>
  `${config.URL.PLATFORM_PROFILES_URL}/${handle}`;

/**
 * Generate Login URL
 */
export const getLoginUrl = () => {
  let regSource = null;
  const pathname = window.location.pathname;
  for (const { path, regSource: source } of PATH_REG_SOURCE_MAP) {
    if (pathname.indexOf(path) != -1) {
      regSource = source;
    }
  }

  return `${config.URL.AUTH}?retUrl=${encodeURIComponent(
    window.location.href.match(/[^?]*/)[0]
  )}${regSource != null ? "&regSource=" + regSource : ""}`;
};

/**
 * Generate Business Login URL
 */
export const getBusinessLoginUrl = () =>
  `${config.URL.AUTH}?regSource=taasApp&mode=login&retUrl=${encodeURIComponent(
    window.location.href.match(/[^?]*/)[0]
  )}`;

/**
 * Logout user from Topcoder
 */
export const logout = () => {
  window.sessionStorage && window.sessionStorage.clear();
  window.location = getLogoutUrl();
};

/**
 * Forward user to login page
 */
export const login = () => {
  window.location = getLoginUrl();
};

/**
 * Forward user to business login page
 */
export const businessLogin = () => {
  window.location = getBusinessLoginUrl();
};

/**
 * Checks If current user's profile creation time
 *
 * @param profile {Object} user profile
 *
 * @returns {boolean}
 */
export const checkProfileCreationDate = (profile) => {
  const thresholdDate = moment(
    config.PROFILE_CREATION_DATE_THRESHOLD,
    "YYYY-MM-DD"
  );

  if (profile?.createdAt) {
    return thresholdDate.isBefore(moment(profile?.createdAt));
  }

  return false;
};
