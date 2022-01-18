import React, { useCallback, useState } from "react";
import { Link } from "@reach/router";
import PT from "prop-types";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import IconCross from "../../../assets/icons/icon-cross.svg";
import { logout, getLogoutUrl } from "utils";
import styles from "./styles.module.scss";

/**
 * Displays user profile icon.
 *
 * @param {Object} props component properties
 * @returns {JSX.Element}
 */
const SelfServiceUserMenu = ({ profile }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const { firstName, lastName } = profile;

  const onClickBtn = useCallback(() => {
    setIsOpenMenu((value) => !value);
  }, []);

  const onClickOutsideMenu = useCallback(() => {
    setIsOpenMenu(false);
  }, []);

  const onClickLogout = useCallback((event) => {
    event.preventDefault();
    logout();
  }, []);

  const onClickMyProfile = useCallback(() => {
    setIsOpenMenu(false);
  }, []);

  return (
    <div className={cn(styles.container, { [styles.menuIsOpen]: isOpenMenu })}>
      <OutsideClickHandler onOutsideClick={onClickOutsideMenu}>
        <div
          className={styles.button}
          onClick={onClickBtn}
          role="button"
          tabIndex={0}
        >
          <span className={styles.initials}>
            {firstName.charAt(0)}
            {lastName.charAt(0)}
          </span>
          <IconCross className={styles.icon} />
        </div>
        {isOpenMenu && (
          <div className={styles.menu}>
            <div className={styles.userInfo}>
              {firstName} {lastName.charAt(0)}.
            </div>
            <ul className={styles.items}>
              <li>
                <Link onClick={onClickMyProfile} to="/self-service/profile">
                  My Profile
                </Link>
              </li>
              <li>
                <a href={getLogoutUrl()} onClick={onClickLogout}>
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        )}
      </OutsideClickHandler>
    </div>
  );
};

SelfServiceUserMenu.propTypes = {
  profile: PT.shape({
    firstName: PT.string.isRequired,
    lastName: PT.string.isRequired,
  }).isRequired,
};

export default SelfServiceUserMenu;
