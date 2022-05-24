# Topcoder Navbar Microapp

This is a [single-spa](https://single-spa.js.org/) microapp which shows the main top bar for Topcoder websites and handles user authorization.

> **NOTE:** This application has been configured to be run as child app of a single-spa application. So while this app can be deployed and run independently, we would need some frame [single-spa](https://single-spa.js.org/) which would load it. While technically we can achieve running this app as standalone app it's strongly not recommended by the author of the `single-spa` approch, see this [GitHub Issue](https://github.com/single-spa/single-spa/issues/640) for details.

>**NOTE:** To successfully run this application, you must first run the `mfe-core` app. Please see its corresponding README for instructions.

## Requirements

- node - v10.22.1
- npm - v6.14.6

## Local Environment Setup

### IDE

Use the [VS Code](https://code.visualstudio.com/download) IDE for MFE development.

### NVM
Use the node version manager [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) to easily and safely manage the required version of NodeJS (aka, node). Download and install it per the instructions for your development operating system. Installing a version of node via `nvm` will also install `npm`.

Once nvm is installed, run: 
```
$ nvm install <insert node version>
```

>**NOTE:** the node version required at the time of this writing is `10.22.1`

At the root of the project directory you'll notice a file called `.nvmrc` which specifies the node version used by the project. The command `nvm use` will use the version specified in the file if no version is supplied on the command line. 
See [the nvm Github README](https://github.com/nvm-sh/nvm/blob/master/README.md#nvmrc) for more information on setting this up.

You can verify the versions of `nvm`, `node`, and `npm` using the commands below.
| Command           | Supported Version  |
| ----------------- | -------- |
| `$ npm -v`        | 6.14.6  |
| `$ node -v`       | v10.22.1 |
| `$ nvm --version` | 0.39.1   |
| `$ nvm current`   | v10.22.1 |

### Hosting 
You will need to add the following line to your hosts file. The hosts file is normally located at `/etc/hosts` (Mac). Do not overwrite the existing localhost entry also pointing to 127.0.0.1.

```
127.0.0.1      local.topcoder-dev.com
```

The MFE can run in a non-ssl environment, but auth0 will complain and throw errors. In order to bypass this, you will need to install [local-ssl-proxy](https://www.npmjs.com/package/local-ssl-proxy) to run the site in ssl. The following command will install it globally:
```
$ npm i -g local-ssl-proxy
```

### Terminal Configuration

This navbar app needs to run a server and SSL proxy, each on a separate terminal session. The MFE Core Frame also needs to run two separate terminal sessions for its local server and client processes. Finally, each of the other micro front-end applications you want to run will also each run in their own terminal session.

When developing one of the micro front-end applications you will therefore have 5 terminal sessions running at the same time:

- `mfe-core` server
- `mfe-core` client
- `mfe-header` application
- `local-ssl-proxy` server
- the MFE app you're developing 

Given this complexity, it is recommended that you use a tool like [iTerm2](https://iterm2.com) (on Mac) or an equivalent terminal shell on Windows to make terminal management simpler. iTerm2 allows you to setup a pre-defined window layout of terminal sessions, including the directory in which the session starts. This setup, along with simple shell scripts in each project that configure and start the environment, will allow you to get your development environment up and running quickly and easily.

## Git
### Branching
When working on Jira tickets, we link associated Git PRs and branches to the tickets. Use the following naming convention for branches:

`[TICKET #]_short-description`

e.g.: `PROD-1516_work-issue`

### Commits
We use [Smart Commits](https://bigbrassband.com/git-integration-for-jira/documentation/smart-commits.html#bbb-nav-basic-examples) to link comments and time tracking to tickets. You would enter the following as your commit message:

`[TICKET #] #comment <commit message> #time <jira-formatted time>`

e.g.: `PLAT-001 #comment adding readme notes #time 45m`

## Config

There are 2 config file for production and development environment in the `config` folder.
Set environment variable `APPENV=dev` to use development config, or `APPENV=prod` to use production config.

## NPM Commands

| Command               | Description                                                       |
| --------------------- | ----------------------------------------------------------------- |
| `npm start`           | Run server which serves production ready build from `dist` folder |
| `npm start-local`     | Run the application locally                                       |
| `npm start-local-proxy` | Run the local SSL proxy                                         |
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

To run the app locally, run the following commands from the project root `./mfe-header`:

**macOS**

Terminal 1:
```
$ npm run start-local
```

Terminal 2:
```
$ npm run start-local-proxy
```

**Windows**

Copy the contents of the Bash scripts `start-local.sh` and `start-local-proxy.sh` and paste them in two separate Command Prompts.

The site should now be available at https://local.topcoder-dev.com

>**NOTE:** To successfully run this application, you must first run `mfe-core`. Please see its corresponding README for instructions. 

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
- Now you have to configure frame app to use the URL provided by Heroku like `https://<APP-NAME>.herokuapp.com/topcoder-mfe-header.js` to load this microapp.
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
- `disableNavigationForRoute` - disable (remove) navigation for some route
- `enableNavigationForRoute` - enable (remove) navigation for some route

#### How to export

- To export any function we have to `export` in file [src/topcoder-mfe-header.js](src/topcoder-mfe-header.js).
- If we want to prepare some function for exporting, the good place to do so is inside [src/utils/exports.js](src/utils/exports.js).
  - We have to bind actions before exporting.
  - It's not recommended to export the whole Redux Store to keep only navbar responsible for updating it. It's better to create promises which would return some particular value from the store.

#### How to import

When we want to use methods exported in the navbar microapp in other apps we have to make sure that webpack would not process imports from navbar as it is handled by `importmaps`, see [Cross microfrontend imports](https://single-spa.js.org/docs/recommended-setup/#cross-microfrontend-imports).

##### How to import in React app

For example see https://github.com/topcoder-platform/micro-frontends-react-app

1. Add `@topcoder/mfe-header` to `externals` in webpack config:

   ```js
   externals: {
      "@topcoder/mfe-header": "@topcoder/mfe-header",
    },
   ```

2. As `importmaps` only work in browser and don't work in unit test, we have to mock this module in unit tests. For example by creating a file `src/__mocks__/@topcoder/mfe-header.js` with the content like:
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

1. Add `@topcoder/mfe-header` to `externals` in webpack config:

   ```js
   externals: {
      "@topcoder/mfe-header": "@topcoder/mfe-header",
    },
   ```

2. Add type definition in `src/typings.d.ts`:

   ```js
   declare module '@topcoder/mfe-header' {
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

3. TODO: How to make e2e tests work for Angular? So far they fail with error `Module not found: Error: Can't resolve '@topcoder/mfe-header'`

## Linting

We use linting to enforce standardization. Please make sure all lint rules pass before creating PRs. 

Use the following command to check for lint errors:
```
$ npm run lint
``` 

## Styling

We use [Sass](https://sass-lang.com/) for styling, which is a preprocessor scripting language that compiles to CSS and allows for the use of variables, nested rules, mixins, functions, etc.

**Variables** can be used to store any CSS value that you want to reuse throughout your stylesheets. Variables are prefixed with the $ symbol.

e.g. styles.scss
```
$primary-color: #333;

body {
  color: $primary-color;
}
```

**Mixins** let you create groups of CSS declarations that you want to reuse throughout your site. You can also pass in values to make your mixin more flexible, and you call them using `@include`.

e.g. styles.scss
```
@mixin theme($theme: DarkGray) {
  background: $theme;
  color: #fff;
}

.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
```

Shared stylesheets are located in `src/styles/`. We use variables and mixins for handling padding, colors and breakpoints in the application, among others. To reference these in your SCSS files, simply add the following line at the top of your file.

```
@import '[path to]/styles';
```

### Colors

Colors are defined as variables in `src/styles/_variables.scss`.

### Breakpoints

Breakpoint mixins (mobile and desktop) are defined in `src/styles/_mixins.scss` and can be used to apply different styling based on the screen width. 

Here is an example that applies a different height value than the default to a css class selector if the screen is considered that of a mobile device (max 1199px).

_mixins.scss
```
@mixin mobile {
  @media (max-width: 1199px) {
    @content;
  }
}
```

example.scss
```
@import '../styles';

.example {
  height: 100px;
  @include mobile {
    height: 50px;
  }
}
```

### Topcoder UI Kit
Additionally, this site uses the [Topcoder UI Kit](https://www.npmjs.com/package/tc-ui), which houses Topcoder's style guide and component library. Please see [here](https://app.frontify.com/d/zEXqGHFD1YN2/ui-library) for additional documentation.

## Icons

### Custom SVGs
Custom SVGs can be imported and used directly as a React component. Save your SVG in its own file within `src/assets/icons` or `src/assets/images`, and then import the SVG as a React component.

e.g.: 
```
import IconNotificationWarning from "../../../assets/icons/notification-warning.svg";

...

  return (
    <div>
      <IconNotificationWarning className={className}>
    </div>
  )
```

### Styling Icons

You can style an SVG icon by overwritting its properties with CSS (height, width, fill, etc.). 

e.g.:
```
.logo-link {
    svg {
        width: calc($pad-xxl + $pad-xxxxl);
        height: $pad-xl;
        fill: none;

        path {
            fill: $tc-white;
        }
    } 
}
```

