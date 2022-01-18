/**
 * NavBar component.
 *
 * Shows global top navigation bar with all apps menu, logo and user menu.
 */
import React, {
  useState,
  useCallback,
  Fragment,
  useEffect,
  useMemo,
} from "react";
import cn from "classnames";
import _ from "lodash";
import PropTypes from "prop-types";
import UserMenu from "../UserMenu";
import AllAppsMenu from "../AllAppsMenu";
import { useSelector } from "react-redux";
import { Link, useLocation } from "@reach/router";
import TCLogo from "../../assets/images/tc-logo.svg";
import {
  getSignUpUrl,
  getLoginUrl,
  getSelfServiceLoginUrl,
  getSelfServiceSignUpUrl,
} from "../../utils";
import "./styles.css";
import { useMediaQuery } from "react-responsive";
import NotificationsMenu from "../NotificationsMenu";
import SelfServiceNotifications from "../SelfServiceNotificationsMenu";
import SelfServiceUserMenu from "../SelfServiceUserMenu";

const NavBar = ({ hideSwitchTools }) => {
  // all menu options
  const menu = useSelector((state) => state.menu.categories);
  // flat list of all apps
  const apps = useMemo(() => _.flatMap(menu, "apps"), [menu]);
  // Active app
  const [activeApp, setActiveApp] = useState(null);
  const auth = useSelector((state) => state.auth);
  const isMobile = useMediaQuery({
    query: "(max-width: 1023px)",
  });

  const routerLocation = useLocation();

  const loginUrl = routerLocation.pathname.startsWith("/self-service/wizard")
    ? getSelfServiceLoginUrl()
    : getLoginUrl();

  const signUpUrl = routerLocation.pathname.startsWith("/self-service")
    ? getSelfServiceSignUpUrl()
    : getSignUpUrl();

  // Check app title with route activated
  useEffect(() => {
    const activeApp = apps.find(
      (f) => routerLocation.pathname.indexOf(f.path) !== -1
    );
    setActiveApp(activeApp);
  }, [routerLocation, apps]);

  // Change micro-app callback
  const changeApp = useCallback(
    (app) => {
      setActiveApp(app);
    },
    [setActiveApp]
  );

  const renderTopcoderLogo = hideSwitchTools ? (
    <img src={TCLogo} alt="Topcoder Logo" />
  ) : (
    <Link to="/">
      <img src={TCLogo} alt="Topcoder Logo" />
    </Link>
  );

  return (
    <div className={cn("navbar", { "self-service-navbar": hideSwitchTools })}>
      <div className="navbar-left">
        {isMobile ? (
          hideSwitchTools ? null : (
            <AllAppsMenu />
          )
        ) : (
          <Fragment>
            {renderTopcoderLogo}
            <div className="navbar-divider"></div>
            <div className="navbar-app-title">
              {activeApp ? activeApp.title : ""}
            </div>
          </Fragment>
        )}
      </div>

      <div className="navbar-center">
        {isMobile ? renderTopcoderLogo : <Fragment></Fragment>}
        {process.env.NODE_ENV === "test" && (
          <h3 style={{ display: "none" }}>Navbar App Test</h3>
        )}
      </div>

      <div className="navbar-right">
        {isMobile ? (
          <Fragment>
            {auth.isInitialized &&
              (auth.tokenV3 ? (
                auth.profile &&
                (hideSwitchTools ? (
                  <Fragment>
                    <SelfServiceNotifications />
                    <SelfServiceUserMenu profile={auth.profile} />
                  </Fragment>
                ) : (
                  <Fragment>
                    <NotificationsMenu />
                    <UserMenu
                      profile={auth.profile}
                      hideSwitchTools={hideSwitchTools}
                    />
                  </Fragment>
                ))
              ) : (
                <a href={loginUrl} className="navbar-login">
                  Login
                </a>
              ))}
          </Fragment>
        ) : (
          <Fragment>
            {hideSwitchTools ? null : (
              <Fragment>
                <AllAppsMenu appChange={changeApp} />
                <div className="navbar-divider" />
              </Fragment>
            )}
            {auth.isInitialized &&
              (auth.tokenV3 ? (
                auth.profile &&
                (hideSwitchTools ? (
                  <Fragment>
                    <SelfServiceNotifications />
                    <SelfServiceUserMenu profile={auth.profile} />
                  </Fragment>
                ) : (
                  <Fragment>
                    <NotificationsMenu />
                    <UserMenu
                      profile={auth.profile}
                      hideSwitchTools={hideSwitchTools}
                    />
                  </Fragment>
                ))
              ) : (
                <>
                  <a href={loginUrl} className="navbar-login">
                    Login
                  </a>
                  {hideSwitchTools && (
                    <a href={signUpUrl} className="navbar-button">
                      Sign Up
                    </a>
                  )}
                </>
              ))}
          </Fragment>
        )}
      </div>
    </div>
  );
};

NavBar.defaultProps = {
  hideSwitchTools: false,
};

NavBar.propTypes = {
  hideSwitchTools: PropTypes.boolean,
};

export default NavBar;
