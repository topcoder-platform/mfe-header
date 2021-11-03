import _ from 'lodash';
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
 * TODO: Re-check when onboarding processor is ready
 * Check Onboarding API
 *
 * @param resp {Object} User trait object
 *
 * @returns {boolean | string}
 */
export function checkOnboarding(resp) {
  if (resp?.data.length === 0) {
    return "/onboard/";
  }
  const data = resp?.data.filter(
    (item) => item.traitId === "onboarding_checklist"
  )[0].traits.data[0].profile_completed;
  if (data.status === "completed") {
    return false;
  }

  // TODO: Re-check when onboarding processor is ready.
  // It checks for at least one onboarding checklist was completed, then we don't enter onboarding flow
  // This logic will be changed.
  for (const item in data.metadata) {
    if (data.metadata[item]) {
      return false;
    }
  }

  const steps = {
    "/onboard/": ["profile_picture", "skills"],
    "/onboard/contact-details": ["country"],
    "/onboard/payments-setup": [],
    "/onboard/build-my-profile": ["bio", "work", "education", "language"],
  };
  if (data.status === "pending_at_user") {
    const flags = Object.keys(data.metadata);
    for (const step of Object.keys(steps)) {
      for (const flag of steps[step]) {
        if (flags.indexOf(flag) >= 0 && !data.metadata[flag]) {
          return step;
        }
      }
    }
  }
  return false;
}

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
