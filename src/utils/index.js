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
  `${
    config.URL.AUTH
  }?regSource=taasApp&mode=login&retUrl=${encodeURIComponent(
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
