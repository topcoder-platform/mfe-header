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
import _ from "lodash";
import PropTypes from "prop-types";
import UserMenu from "../UserMenu";
import AllAppsMenu from "../AllAppsMenu";
import { useSelector } from "react-redux";
import { Link, useLocation } from "@reach/router";
import TCLogo from "../../assets/images/tc-logo.svg";
import {
  getLoginUrl,
  getSelfServiceLoginUrl,
  getSelfServiceSignupUrl,
} from "../../utils";
import { BUTTON_TYPE } from "constants/";
import "./styles.css";
import { useMediaQuery } from "react-responsive";
import NotificationsMenu from "../NotificationsMenu";
import Button from "../Button";
import { ProfileSelector } from '../../../src-ts/profile-selector'

const NavBar = ({ hideSwitchTools, profileUrl }) => {
  const [isSelfService, setIsSelfService] = useState(false);
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

  const loginUrl = isSelfService ? getSelfServiceLoginUrl() : getLoginUrl();
  const signupUrl = isSelfService ? getSelfServiceSignupUrl() : "";

  const workPath = '/self-service'

  // Check app title with route activated
  useEffect(() => {
    const activeApp = apps.find(
      (f) => routerLocation.pathname.indexOf(f.path) !== -1
    );
    setActiveApp(activeApp);

    setIsSelfService(routerLocation.pathname.indexOf(workPath) !== -1);
  }, [routerLocation, apps]);

  // Change micro-app callback
  const changeApp = useCallback(
    (app) => {
      setActiveApp(app);
    },
    [setActiveApp]
  );


  // if this is work app, we only want to show the link as clickable
  // if we're not on the page to which the link goes
  const isSelfServiceHome = [workPath, `${workPath}/dashboard`].includes(routerLocation.pathname)

  // if the consuming app has requested that we disable the navigation
  // or we're on the work app home page,
  // don't make the logo a link
  let renderTopcoderLogo

  if (hideSwitchTools && isSelfServiceHome) {

    const linkClass = isSelfServiceHome ? 'logo-no-link' : ''
    renderTopcoderLogo = (
      <img
        className={linkClass}
        src={TCLogo} alt="Topcoder Logo" />
    )

  } else {

    renderTopcoderLogo = (
      <Link to={isSelfService ? workPath : "/"}>
        <img src={TCLogo} alt="Topcoder Logo" />
      </Link>
    )
  }

  // if this is not the self service app or it's the self service home,
  // make the title not clickable
  const renderTitle = !isSelfService || isSelfServiceHome
    ? activeApp?.title || ""
    : (
      <Link to={workPath}>
        Work
      </Link>
    )

  const renderProfile = !isSelfService
    ? (
      <>
        <NotificationsMenu />
        <UserMenu
          profileUrl={profileUrl}
          profile={auth.profile}
          hideSwitchTools={hideSwitchTools}
        />
      </>
    )
    : (
      <ProfileSelector
        initialized={auth.isInitialized}
        profile={auth.profile}
        workPath={workPath}
      />
    )

  const renderLogin = (
    <a href={loginUrl} className="navbar-login">
      Log in
    </a>
  )

  const renderSignup = (
    <Button
      href={signupUrl}
      className="navbar-signup"
      type={BUTTON_TYPE.SECONDARY}
    >
      SIGN UP
    </Button>
  )
  const renderNotLoggedIn = !isSelfService
    ? renderLogin
    : (isMobile
      ? renderSignup
      : (
        <>
          {renderLogin}
          {renderSignup}
        </>
      )
    )


  return (
    <div className="navbar">
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
              {renderTitle}
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
              (auth.tokenV3 ? (auth.profile && (renderProfile)) : (renderNotLoggedIn))}
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
              (auth.tokenV3 ? (auth.profile && (renderProfile)) : (renderNotLoggedIn))}
          </Fragment>
        )}
      </div>
    </div>
  );
};

NavBar.defaultProps = {
  hideSwitchTools: false,
  profileUrl: '/profile/',
};

NavBar.propTypes = {
  profileUrl: PropTypes.string,
  hideSwitchTools: PropTypes.boolean,
};

export default NavBar;
