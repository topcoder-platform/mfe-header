/**
 * UserMenu component.
 *
 * Shows logged-in user with user menu with options like log-out.
 */
import React, { useState, useCallback, Fragment } from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";
import Avatar from "../Avatar";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import { logout, getLogoutUrl } from "../../utils";
import "./styles.scss";
import { useMediaQuery } from "react-responsive";

import Settings from "../../assets/images/settings.svg";
import LogOut from "../../assets/images/logout.svg";

const UserMenu = ({ profile, profileUrl }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const closeMenu = useCallback(() => {
    setIsOpenMenu(false);
  }, [setIsOpenMenu]);

  const isMobile = useMediaQuery({
    query: "(max-width: 1023px)",
  });

  const toggleMenu = useCallback(() => {
    setIsOpenMenu(!isOpenMenu);
  }, [isOpenMenu, setIsOpenMenu]);

  const onLogoutClick = useCallback((evt) => {
    evt.preventDefault();
    logout();
  }, []);

  return (
    <OutsideClickHandler onOutsideClick={closeMenu}>
      <div className="user-menu">
        <div
          className={cn("user-menu-handler", {
            "user-menu-handler-active": isOpenMenu,
          })}
          onClick={toggleMenu}
          role="button"
          tabIndex="0"
        >
          <Avatar profile={profile} />
        </div>

        {isOpenMenu && (
          <div className="user-menu-popover-wrapper">
            <div className="user-menu-popover">
              <div className="user-menu-popover-arrow" />
              <div className="user-menu-popover-content">
                <div className="user-menu-handle">{profile.handle}</div>
                <ul className="user-menu-list">
                  <li>
                    <Link to={`${profileUrl}`} onClick={closeMenu}>
                      <img src={Settings} alt="#" /> Profile Settings
                    </Link>
                  </li>
                  <li>
                    <a href={getLogoutUrl()} onClick={onLogoutClick}>
                      <img src={LogOut} alt="#" /> Log Out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

UserMenu.defaultProps = {
  profileUrl: '/profile',
};

UserMenu.propTypes = {
  profileUrl: PropTypes.string,
};

export default UserMenu;
