/**
 * Adapt this React app to be run a single spa microapp.
 *
 * This file list everything we export to be used by other microapps.
 */
import "./set-public-path";
import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";
import "./global.css?modules=false";
import {
  setAppMenu,
  disableSidebarForRoute,
  enableSidebarForRoute,
  getAuthUserTokens,
  getAuthUserProfile,
  setNotificationPlatform,
} from "./utils/exports";

import { login, businessLogin, logout } from "./utils";
import { PLATFORM } from "./constants/notifications";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;

// list everything we want to export for other microapps here
export {
  login,
  businessLogin,
  logout,
  setAppMenu,
  getAuthUserTokens,
  getAuthUserProfile,
  disableSidebarForRoute,
  enableSidebarForRoute,
  setNotificationPlatform,
  PLATFORM,
};
