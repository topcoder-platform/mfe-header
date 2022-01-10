/**
 * Menu reducer
 */
import _ from "lodash";
import { ACTIONS, APP_CATEGORIES } from "../constants";

/**
 * Menu State Initial Structure
 */
const initialState = {
  categories: APP_CATEGORIES, // Default Apps Menu structure.
  disabledRoutes: [],
  disabledNavigations: [],
};

/**
 * Find indexes of the category and app in the menu structure by the app's path.
 *
 * @param {Array}  categories list of app categories
 * @param {String} appPath    app path to find
 *
 * @returns {{categoryIndex: number, appIndex: number}} category and app indexes
 */
const findIndexByPath = (categories, appPath) => {
  let categoryIndex = -1;
  let appIndex = -1;

  for (let c = 0; c < categories.length; c++) {
    const category = categories[c];
    const appsCount = category.apps ? category.apps.length : 0;
    for (let a = 0; a < appsCount; a++) {
      const app = category.apps[a];
      if (app.path === appPath) {
        categoryIndex = c;
        appIndex = a;
      }
    }
  }

  return { categoryIndex, appIndex };
};

/**
 * Updates category in the category list without mutation.
 *
 * @param {Array}    categories    list of categories
 * @param {Number}   categoryIndex category index to update
 * @param {Function} update        method which would be applied to the category
 *
 * @returns {Array} updated list of categories
 */
const updateCategory = (categories, categoryIndex, update) => {
  return [
    ...categories.slice(0, categoryIndex),
    update(categories[categoryIndex]),
    ...categories.slice(categoryIndex + 1),
  ];
};

/**
 * Updates app in the category list without mutation.
 *
 * @param {Array}    categories    list of categories
 * @param {Number}   categoryIndex category index
 * @param {Number}   appIndex      app index to update
 * @param {Function} update        method which would be applied to the app
 *
 * @returns {Array} updated list of categories
 */
const updateApp = (categories, categoryIndex, appIndex, update) => {
  return updateCategory(categories, categoryIndex, (category) => ({
    ...category,
    apps: [
      ...category.apps.slice(0, appIndex),
      update(category.apps[appIndex]),
      ...category.apps.slice(appIndex + 1),
    ],
  }));
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.MENU.SET_APP_MENU: {
      const { path, menuOptions } = action.payload;
      const { categoryIndex, appIndex } = findIndexByPath(
        state.categories,
        path
      );

      // if we cannot find the app, just log error and don't try to update it
      if (categoryIndex === -1 || appIndex === -1) {
        console.error(`App is not found by path "${path}".`);
        return state;
      }

      return {
        ...state,
        categories: updateApp(
          state.categories,
          categoryIndex,
          appIndex,
          (app) => ({
            ...app,
            menu: menuOptions,
          })
        ),
      };
    }

    case ACTIONS.MENU.DISABLE_SIDEBAR_FOR_ROUTE: {
      // if route is already disabled, don't do anything
      if (state.disabledRoutes.indexOf(action.payload) > -1) {
        return state;
      }

      return {
        ...state,
        // add route to the disabled list
        disabledRoutes: [...state.disabledRoutes, action.payload],
      };
    }

    case ACTIONS.MENU.ENABLE_SIDEBAR_FOR_ROUTE: {
      // if route is not disabled, don't do anything
      if (state.disabledRoutes.indexOf(action.payload) === -1) {
        return state;
      }

      return {
        ...state,
        // remove the route from the disabled list
        disabledRoutes: _.without(state.disabledRoutes, action.payload),
      };
    }

    case ACTIONS.MENU.DISABLE_NAVIGATION_FOR_ROUTE: {
      // if route is already disabled, don't do anything
      if (state.disabledNavigations.indexOf(action.payload) > -1) {
        return state;
      }

      return {
        ...state,
        // add route to the disabled list
        disabledNavigations: [...state.disabledNavigations, action.payload],
      };
    }

    case ACTIONS.MENU.ENABLE_NAVIGATION_FOR_ROUTE: {
      // if route is not disabled, don't do anything
      if (state.disabledNavigations.indexOf(action.payload) === -1) {
        return state;
      }

      return {
        ...state,
        // remove the route from the disabled list
        disabledNavigations: _.without(
          state.disabledNavigations,
          action.payload
        ),
      };
    }

    default:
      return state;
  }
};

export default menuReducer;
