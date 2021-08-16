# Topcoder Navbar Microapp

This is a [single-spa](https://single-spa.js.org/) microapp which shows the main top bar for Topcoder websites and handles user authorization.

> NOTE. This application have been configured to be run as child app of a single-spa application. So while this app can be deployed and run independently, we would need some frame [single-spa](https://single-spa.js.org/) which would load it. While technically we can achieve running this app as standalone app it's strongly not recommended by the author of the `single-spa` approch, see this [GitHub Issue](https://github.com/single-spa/single-spa/issues/640) for details.

## Requirements

- node - v10.22.1
- npm - v6.14.6

## Config

There are 2 config file for production and development environment in the `config` folder.
Set environment variable `APPENV=dev` to use development config, or `APPENV=prod` to use production config.

## NPM Commands

| Command               | Description                                                       |
| --------------------- | ----------------------------------------------------------------- |
| `npm start`           | Run server which serves production ready build from `dist` folder |
| `npm run dev`         | Run app in the development mode                                   |
| `npm run dev-https`   | Run app in the development mode using HTTPS protocol              |
| `npm run build`       | Build app for production and puts files to the `dist` folder      |
| `npm run analyze`     | Analyze dependencies sizes and opens report in the browser        |
| `npm run lint`        | Check code for lint errors                                        |
| `npm run format`      | Format code using prettier                                        |
| `npm run test`        | Run unit tests                                                    |
| `npm run watch-tests` | Watch for file changes and run unit tests on changes              |
| `npm run coverage`    | Generate test code coverage report                                |

## Local Deployment

Inside the project folder run:

- `npm i` - install dependencies
- `npm run dev` - run app in development mode
- As this app can be loaded only inside a frame single-spa, you have to run a `micro-frontends-frame` frame app and configure it to use the URL `http://localhost:8080/topcoder-micro-frontends-navbar-app.js`.

## Deployment to Production

- `npm i` - install dependencies
- `npm build` - build code to `dist/` folder
- Now you can host `dist/` folder using any static server. For example, you may run a simple `Express` server by running `npm start`.

### Deploying to Heroku

Make sure you have [Heroky CLI](https://devcenter.heroku.com/articles/heroku-cli) installed and you have a Heroku account. And then inside the project folder run the next commands:

- If there is not Git repository inited yet, create a repo and commit all the files:
  - `git init`
  - `git add .`
  - `git commit -m'inital commit'`
- `heroku apps:create` - create Heroku app
- `git push heroku master` - push changes to Heroku and trigger deploying
- Now you have to configure frame app to use the URL provided by Heroku like `https://<APP-NAME>.herokuapp.com/topcoder-micro-frontends-navbar-app.js` to load this microapp.
- NOTE: Authorization would not work because only predefined list of domain allowed by `accounts-app`.

### Cross microfrontend imports

This app exports functions to be imported by other microapps.

- `login` - redirects to login page
- `businessLogin` - redirects to business (i.e. customer) login page
- `logout` - clears session storage and redirects to logout page
- `setAppMenu` - sets sidebar menu for the app by app's `path`
- `getAuthUserTokens` - returns a promise which resolves to object with user tokens `{ tokenV3, tokenV2 }`
- `getAuthUserProfile` - returns a promise which resolves to the user profile object
- `disableSidebarForRoute` - disable (remove) sidebar for some route
- `enableSidebarForRoute` - enable sidebar for the route, which was previously disabled

#### How to export

- To export any function we have to `export` in file [src/topcoder-micro-frontends-navbar-app.js](src/topcoder-micro-frontends-navbar-app.js).
- If we want to prepare some function for exporting, the good place to do so is inside [src/utils/exports.js](src/utils/exports.js).
  - We have to bind actions before exporting.
  - It's not recommended to export the whole Redux Store to keep only navbar responsible for updating it. It's better to create promises which would return some particular value from the store.

#### How to import

When we want to use methods exported in the navbar microapp in other apps we have to make sure that webpack would not process imports from navbar as it is handled by `importmaps`, see [Cross microfrontend imports](https://single-spa.js.org/docs/recommended-setup/#cross-microfrontend-imports).

##### How to import in React app

For example see https://github.com/topcoder-platform/micro-frontends-react-app

1. Add `@topcoder/micro-frontends-navbar-app` to `externals` in webpack config:

   ```js
   externals: {
      "@topcoder/micro-frontends-navbar-app": "@topcoder/micro-frontends-navbar-app",
    },
   ```

2. As `importmaps` only work in browser and don't work in unit test, we have to mock this module in unit tests. For example by creating a file `src/__mocks__/@topcoder/micro-frontends-navbar-app.js` with the content like:
   ```js
   module.exports = {
     login: () => {},
     businessLogin: () => {},
     logout: () => {},
     setAppMenu: () => {},
     getAuthUserTokens: () => new Promise(() => {}),
     getAuthUserProfile: () => new Promise(() => {}),
     disableSidebarForRoute: () => {},
     enableSidebarForRoute: () => {},
   };
   ```

##### How to import in Angular app

For example see https://github.com/topcoder-platform/micro-frontends-angular-app

1. Add `@topcoder/micro-frontends-navbar-app` to `externals` in webpack config:

   ```js
   externals: {
      "@topcoder/micro-frontends-navbar-app": "@topcoder/micro-frontends-navbar-app",
    },
   ```

2. Add type definition in `src/typings.d.ts`:

   ```js
   declare module '@topcoder/micro-frontends-navbar-app' {
     export const login: any;
     export const businessLogin: any;
     export const logout: any;
     export const setAppMenu: any;
     export const getAuthUserTokens: any;
     export const getAuthUserProfile: any;
     export const disableSidebarForRoute: any;
     export const enableSidebarForRoute: any;
   }
   ```

3. TODO: How to make e2e tests work for Angular? So far they fail with error `Module not found: Error: Can't resolve '@topcoder/micro-frontends-navbar-app'`
