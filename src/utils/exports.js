/**
 * Prepare all the methods to be ready for exporting to be used in other micoapps in this file.
 *
 * Additionally, we need to export them in `topcoder-micro-frontends-navbar-app.js`.
 */
import _ from "lodash";
import { bindActionCreators } from "redux";
import store from "../store";
import menuActions from "../actions/menu";
import authActions from "../actions/auth";
import notificationActions from "../actions/notifications";

// bind all the actions for exporting here
export const {
  setAppMenu,
  disableSidebarForRoute,
  enableSidebarForRoute,
  setNotificationPlatform,
  setUserProfilePhoto,
  disableNavigationForRoute,
  enableNavigationForRoute,
} = bindActionCreators(
  {
    setAppMenu: menuActions.setAppMenu,
    disableSidebarForRoute: menuActions.disableSidebarForRoute,
    enableSidebarForRoute: menuActions.enableSidebarForRoute,
    setNotificationPlatform: notificationActions.setNotificationPlatform,
    setUserProfilePhoto: authActions.setProfilePhoto,
    disableNavigationForRoute: menuActions.disableNavigationForRoute,
    enableNavigationForRoute: menuActions.enableNavigationForRoute,
  },
  store.dispatch
);

/**
 * Get authenticated user profile.
 */
export const getAuthUserProfile = () => {
  const { auth } = store.getState();

  if (auth.isProfileLoaded) {
    return Promise.resolve(auth.profile);
  } else {
    return new Promise((resolve, reject) => {
      store.subscribe(() => {
        const { auth } = store.getState();

        if (auth.isProfileLoaded) {
          if (auth.profile !== null) {
            resolve(auth.profile);
          } else {
            reject("Failed to load user profile.");
          }
        }
      });
    });
  }
};

/**
 * Get authenticated user tokens.
 */
export const getAuthUserTokens = () => {
  const { auth } = store.getState();

  if (auth.isInitialized) {
    return Promise.resolve(_.pick(auth, ["tokenV2", "tokenV3"]));
  } else {
    return new Promise((resolve) => {
      store.subscribe(() => {
        const { auth } = store.getState();

        if (auth.isInitialized) {
          resolve(_.pick(auth, ["tokenV2", "tokenV3"]));
        }
      });
    });
  }
};
