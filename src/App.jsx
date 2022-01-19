/**
 * Main App component
 */
import React, { useState, useCallback, useMemo, useEffect } from "react";
import _ from "lodash";
import MainMenu from "./components/MainMenu";
import NavBar from "./components/NavBar";
import { navigate, Router, useLocation } from "@reach/router";
import { useSelector } from "react-redux";
import useMatchSomeRoute from "./hooks/useMatchSomeRoute";
import NotificationsModal from "./components/NotificationsModal";
import "./styles/main.module.scss";

const App = () => {
  // all menu options
  const menu = useSelector((state) => state.menu.categories);
  // flat list of all apps (only updated when menu updated in the Redux store)
  const apps = useMemo(() => _.flatMap(menu, "apps"), [menu]);
  // list of routes where we have to disabled sidebar
  const disabledRoutes = useSelector((state) => state.menu.disabledRoutes);
  // list of routes where we have to disabled navigations
  const disabledNavigations = useSelector(
    (state) => state.menu.disabledNavigations
  );
  // user profile information
  const auth = useSelector((state) => state.auth);
  // `true` is sidebar has to be disabled for the current route
  const isSideBarDisabled = useMatchSomeRoute(disabledRoutes);
  // `true` is navigation has to be disabled for the current route
  const isNavigationDisabled = useMatchSomeRoute(disabledNavigations);
  // Left sidebar collapse state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // Toggle left sidebar callback
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(!sidebarCollapsed);
  }, [sidebarCollapsed, setSidebarCollapsed]);
  const isNotificationsEmpty = useSelector(
    (state) =>
      state.notifications.isLoading ||
      state.notifications.isCommunityLoading ||
      (!state.notifications.initialized &&
        !state.notifications.communityInitialized)
  );
  const location = useLocation();

  // set/remove class for the whole page, to know if sidebar is present or no
  useEffect(() => {
    if (isSideBarDisabled) {
      document.body.classList.add("no-sidebar");
    } else {
      document.body.classList.remove("no-sidebar");
    }
  }, [isSideBarDisabled, location.pathname]);

  return (
    <>
      <Router>
        <NavBar
          default
          noThrow
          profileUrl={
            location.pathname.includes("/self-service")
              ? "/self-service/profile/"
              : `/profile/${_.get(auth, "profile.handle", "")}`
          }
          hideSwitchTools={isNavigationDisabled}
          path="/*"
        />
      </Router>
      {!isSideBarDisabled && (
        <div className="main-menu-wrapper">
          <Router>
            {apps.map((app) => (
              <MainMenu
                sidebarCollapsed={sidebarCollapsed}
                toggleSidebar={toggleSidebar}
                key={app.path}
                path={app.path + "/*"}
                app={app}
              />
            ))}
          </Router>
        </div>
      )}
      <Router>
        <NotificationsModal
          path="notifications"
          isEmpty={isNotificationsEmpty}
        />
      </Router>
    </>
  );
};

export default App;
