import _ from "lodash";
import moment from "moment";
import config from "../../config";

/**
 * Generate Logout URL
 */
export const getLogoutUrl = () =>
  `${config.URL.AUTH}/?logout=true&retUrl=${encodeURIComponent(
    "https://" + window.location.host
  )}`;

/**
 * Generate Login URL
 */
export const getLoginUrl = () =>
  `${config.URL.AUTH}?retUrl=${encodeURIComponent(
    window.location.href.match(/[^?]*/)[0]
  )}`;

/**
 * Generate Business Login URL
 */
export const getBusinessLoginUrl = () =>
  `${config.URL.AUTH}?regSource=taasApp&mode=login&retUrl=${encodeURIComponent(
    window.location.href.match(/[^?]*/)[0]
  )}`;

/**
 * Returns login URL using which the user should be redirected to self service
 * dashboard page after login.
 *
 * @returns {string}
 */
export const getSelfServiceLoginUrl = () =>
  `${config.URL.AUTH}?retUrl=${encodeURIComponent(
    `${window.location.origin}/self-service&regSource=tcBusiness&mode=login`
  )}`;

/**
 * Returns sign-up URL
 *
 * @returns {string}
 */
export const getSignUpUrl = () =>
  `${config.URL.AUTH}?retUrl=${encodeURIComponent(
    `${window.location.href.match(/[^?]*/)[0]}&mode=signUp`
  )}`;

/**
 * Returns sign-up URL using which the user should be redirected to self service
 * dashboard page after login.
 *
 * @returns {string}
 */
export const getSelfServiceSignUpUrl = () =>
  `${config.URL.AUTH}?retUrl=${window.location.origin}/self-service&regSource=tcBusiness&mode=signUp`;

/**
 * Returns self-service app profile url
 *
 * @returns {string}
 */
export const getSelfServiceProfileUrl = () => "/self-service/profile";

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
