import React from "react";
import Bell from "../../assets/icons/ui-bell.svg";
import styles from "./styles.module.scss";

/**
 * Displays self service notification bell.
 *
 * @returns {JSX.Element}
 */
const SelfServiceNotifications = () => {
  return (
    <div className={styles.container}>
      <div className={styles.button}>
        <Bell className={styles.bell} />
        <div className={styles.count}>0</div>
      </div>
    </div>
  );
};

export default SelfServiceNotifications;
