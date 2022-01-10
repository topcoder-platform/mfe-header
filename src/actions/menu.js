import { ACTIONS } from "../constants";

export default {
  /**
   * Set menu options for the app in the side-bar.
   *
   * @param {String} path        app path
   * @param {Array}  menuOptions menu options
   *
   * @returns {{ type: String, payload: any }} action object
   */
  setAppMenu: (path, menuOptions) => ({
    type: ACTIONS.MENU.SET_APP_MENU,
    payload: { path, menuOptions },
  }),

  /**
   * Disable sidebar for route.
   *
   * See how we can define route here https://reach.tech/router/api/Match.
   *
   * @param {String} route route path
   *
   * @returns {{ type: String, payload: any }} action object
   */
  disableSidebarForRoute: (route) => ({
    type: ACTIONS.MENU.DISABLE_SIDEBAR_FOR_ROUTE,
    payload: route,
  }),

  /**
   * Enable sidebar for route.
   *
   * @param {String} route route path
   *
   * @returns {{ type: String, payload: any }} action object
   */
  enableSidebarForRoute: (route) => ({
    type: ACTIONS.MENU.ENABLE_SIDEBAR_FOR_ROUTE,
    payload: route,
  }),

  /**
   * Disable navigation for route.
   *
   * @param {String} route route path
   *
   * @returns {{ type: String, payload: any }} action object
   */
  disableNavigationForRoute: (route) => ({
    type: ACTIONS.MENU.DISABLE_NAVIGATION_FOR_ROUTE,
    payload: route,
  }),

  /**
   * Enable navigation for route.
   *
   * @param {String} route route path
   *
   * @returns {{ type: String, payload: any }} action object
   */
  enableNavigationForRoute: (route) => ({
    type: ACTIONS.MENU.ENABLE_NAVIGATION_FOR_ROUTE,
    payload: route,
  }),
};
