/**
 * NavBar component.
 *
 * Shows global top navigation bar with all apps menu, logo and user menu.
 */
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "@reach/router";
import cn from "classnames";
import _ from "lodash";
import { useMediaQuery } from "react-responsive";
import Button from "../../Button";
import NotificationsMenu from "../NotificationsMenu";
import UserMenu from "../UserMenu";
import TCLogo from "../../../assets/images/tc-logo.svg";
import { getSelfServiceLoginUrl, getSelfServiceSignupUrl } from "utils";
import { BUTTON_TYPE } from "../../../constants";
import "./styles.css";

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

  const isHomePage = routerLocation.pathname.startsWith("/self-service/home");

  const activeAppTitle = (isHomePage ? "Topcoder" : activeApp?.title) || null;

  const onClickBtnLogIn = useCallback(() => {
    window.location.href = getSelfServiceLoginUrl();
  }, []);

  const onClickBtnSignUp = useCallback(() => {
    window.location.href = getSelfServiceSignupUrl();
  }, []);

  // Check app title with route activated
  useEffect(() => {
    const activeApp = apps.find(
      (f) => routerLocation.pathname.indexOf(f.path) !== -1
    );
    setActiveApp(activeApp);
  }, [routerLocation, apps]);

  const renderTopcoderLogo = hideSwitchTools ? (
    <img src={TCLogo} alt="Topcoder Logo" />
  ) : (
    <Link to="/">
      <img src={TCLogo} alt="Topcoder Logo" />
    </Link>
  );

  return (
    <div className={cn("navbar", "self-service-navbar")}>
      <div className="navbar-left">
        {isMobile ? null : (
          <>
            {renderTopcoderLogo}
            <div className="navbar-divider" />
            <div
              className={cn("navbar-app-title", {
                "navbar-app-title-underlined": !isHomePage,
              })}
            >
              {activeAppTitle}
            </div>
          </>
        )}
      </div>
      <div className="navbar-center">
        {isMobile ? renderTopcoderLogo : null}
        {process.env.NODE_ENV === "test" && (
          <h3 style={{ display: "none" }}>Navbar App Test</h3>
        )}
      </div>
      <div className="navbar-right">
        {auth.isInitialized &&
          (auth.tokenV3 ? (
            auth.profile && (
              <>
                <NotificationsMenu />
                <UserMenu profile={auth.profile} />
              </>
            )
          ) : (
            <>
              <Button
                type={BUTTON_TYPE.TEXT_INVERTED}
                onClick={onClickBtnLogIn}
              >
                Log In
              </Button>
              <Button type={BUTTON_TYPE.TEXT} onClick={onClickBtnSignUp}>
                Sign Up
              </Button>
            </>
          ))}
      </div>
    </div>
  );
};

export default NavBar;
