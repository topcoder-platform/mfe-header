/**
 * Auth service which handles user authorization and basic profile loading.
 */
import cookies from "browser-cookies";
import { configureConnector, decodeToken, getFreshToken } from "tc-auth-lib";
import config from "../../config";
import actions from "../actions";

const logger = console;

/**
 * Factory for creating a `fetcher` function which could be used to call Topcoder API V3+ endpoints.
 *
 * @param {String} token Topcoder V3 authorization token
 *
 * @returns {Function}
 */
const getFetcher = (token) => {
  /**
   * Wrapper around `fetch` method to call Topcoder API endpoints with included token.
   *
   * @param {String} endpoint endpoint URL
   * @param {Object} options `fetch` options
   *
   * @returns {Promise}
   */
  const fetcher = (endpoint, options = {}) => {
    const headers = options.headers ? Object.assign({}, options.headers) : {};
    if (token) headers.Authorization = `Bearer ${token}`;

    switch (headers["Content-Type"]) {
      case null:
        delete headers["Content-Type"];
        break;
      case undefined:
        headers["Content-Type"] = "application/json";
        break;
      default:
    }

    return fetch(`${endpoint}`, {
      ...options,
      headers,
    });
  };

  return fetcher;
};

/**
 * Loads Topcoder user profile from v3 API.
 *
 * @param {String} userTokenV3 v3 authentication token.
 * @returns {Object} user profile
 */
const loadProfile = (userTokenV3) => {
  if (!userTokenV3) return Promise.resolve(null);
  const user = decodeToken(userTokenV3);
  const fetcher = getFetcher(userTokenV3);
  return fetcher(`${config.API.V5}/members/${user.handle}`, {
    method: "get",
  })
    .then((res) => res.json())
    .then((res) => res || {});
};

configureConnector({
  connectorUrl: config.URL.ACCOUNTS_APP_CONNECTOR,
  frameId: "tc-accounts-iframe",
  frameTitle: "Accounts authentication window",
});

/**
 * Uses Topcoder accounts-app to fetch / refresh authentication tokens.
 * Results will be storted in the Redux store, inside state.auth.
 * @param {Object} store Redux store.
 */
export function authenticate(store) {
  getFreshToken()
    .then((tctV3) => {
      const tctV2 = cookies.get("tcjwt");
      logger.log("Authenticated as:", decodeToken(tctV3));
      if (!tctV2) logger.error("Failed to fetch API v2 token!");
      return { tctV2, tctV3 };
    })
    .catch(() => {
      logger.warn("Authentication failed!");
      return {};
    })
    .then(({ tctV2, tctV3 }) => {
      const { auth } = store.getState();

      if (auth.tokenV3 !== (tctV3 || null)) {
        loadProfile(tctV3)
          // even if error happens, call `loadProfile` action and set profile as `null`
          .catch(() => null)
          .then((profile) => {
            store.dispatch(actions.auth.loadProfile(profile || null));
          });
        store.dispatch(actions.auth.setTcTokenV3(tctV3));
      } else {
        // if we don't have V3 token, still mark profile as loaded to `null`
        store.dispatch(actions.auth.loadProfile(null));
      }

      if (auth.tokenV2 !== (tctV2 || null)) {
        store.dispatch(actions.auth.setTcTokenV2(tctV2));
      }

      if (!auth.setInitialized) {
        store.dispatch(actions.auth.setInitialized());
      }

      const userV3 = tctV3 ? decodeToken(tctV3) : {};

      /* Automatic refreshment of auth tokens. */
      let time = Number.MAX_VALUE;
      if (tctV2) time = decodeToken(tctV2).exp;
      if (userV3) time = Math.min(time, userV3.exp);
      if (time < Number.MAX_VALUE) {
        time = 1000 * (time - config.REAUTH_OFFSET);
        time = Math.max(0, time - Date.now());
        logger.log("Reauth scheduled in", time / 1000, "seconds");
        setTimeout(() => authenticate(store), time);
      }
    });
}

/**
 * Get the onboarding checklist data to know completed steps
 */
export function getOnboardingChecklist(username, userTokenV3) {
  const fetcher = getFetcher(userTokenV3);
  return fetcher(
    `${config.API.V5}/members/${username}/traits?traitIds=onboarding_checklist`
  )
    .then((res) => res.json())
    .then((res) => ({ data: res || [] }));
}
