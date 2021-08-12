/**
 * Menu component.
 *
 * General component to show menu with submenu.
 */
import React, { Fragment, useCallback, useState } from "react";
import { useLocation } from "@reach/router";
import cn from "classnames";
import { includes, map } from "lodash";
import NavLink from "../NavLink";
import "./styles.css";

const SubMenu = ({ option }) => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(
    includes(map(option.children, "path"), location.pathname)
  );

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  return (
    <>
      <span
        className={cn("menu-link menu-link-toggle", {
          "menu-link-toggle-up": isOpen,
        })}
        onClick={toggleOpen}
        role="button"
        tabIndex="0"
      >
        {option.title}
      </span>
      {isOpen && (
        <ul className="menu-submenu">
          {option.children.map((subOption) => (
            <li key={subOption.path}>
              <NavLink
                to={subOption.path}
                activeClassName="menu-link-active"
                className="menu-link"
              >
                {subOption.title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

const Menu = ({ options, sidebarCollapsed }) => (
  <ul className="menu">
    {options.map((option) => (
      <li key={option.path}>
        {option.path ? (
          <Fragment>
            <NavLink
              to={option.path}
              activeClassName="menu-link-active"
              className="menu-link"
              exact={option.isExact}
            >
              <img
                src={option.activeIcon}
                className="subroute-icon active-icon"
                alt="Subroute Icon"
              />
              <img
                src={option.icon}
                className="subroute-icon gray-icon"
                alt="Subroute Icon"
              />
              {!sidebarCollapsed ? option.title : ""}
            </NavLink>
          </Fragment>
        ) : (
          <SubMenu option={option} />
        )}
      </li>
    ))}
  </ul>
);

export default Menu;
