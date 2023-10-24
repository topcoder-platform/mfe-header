/**
 * UserMenu component.
 *
 * Shows logged-in user with user menu with options like log-out.
 */
import React, { useState, useCallback, Fragment } from "react";
import Avatar from "../Avatar";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import { logout, getLogoutUrl, getProfileUrl } from "../../utils";
import "./styles.css";
import { useMediaQuery } from "react-responsive";

const UserMenu = ({ profile }) => {
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
          {isMobile ? (
            <Fragment></Fragment>
          ) : (
            <div className="user-menu-handle">{profile.handle}</div>
          )}
        </div>

        {isOpenMenu && (
          <div className="user-menu-popover-wrapper">
            <div
              className="user-menu-popover-overlay"
              onClick={closeMenu}
              role="button"
              tabIndex="-1"
            />
            <div className="user-menu-popover">
              <div className="user-menu-popover-arrow" />
              <div className="user-menu-popover-content">
                <ul className="user-menu-list">
                  <li>
                    <a href={getProfileUrl(profile.handle)} onClick={closeMenu}>
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href={getLogoutUrl()} onClick={onLogoutClick}>
                      Log Out
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

export default UserMenu;
