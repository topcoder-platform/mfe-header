import React, { useCallback, useState } from "react";
import PT from "prop-types";
import OutsideClickHandler from "react-outside-click-handler";
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

  return (
    <div className={styles.container}>
      <OutsideClickHandler onOutsideClick={onClickOutsideMenu}>
        <div
          className={styles.button}
          onClick={onClickBtn}
          role="button"
          tabIndex={0}
        >
          {firstName.charAt(0)}
          {lastName.charAt(0)}
        </div>
        {isOpenMenu && (
          <div className={styles.menu}>
            <a href={getLogoutUrl()} onClick={onClickLogout}>
              Log Out
            </a>
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
