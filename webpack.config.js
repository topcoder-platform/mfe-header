/* global __dirname */

const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const autoprefixer = require("autoprefixer");
const path = require("path");
const webpack = require("webpack");

module.exports = (webpackConfigEnv, options) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "topcoder",
    projectName: "micro-frontends-navbar-app",
    webpackConfigEnv,
    disableHtmlGeneration: true,
  });

  const unusedFilesWebpackPlugin = defaultConfig.plugins.find(p => p.constructor.name === "UnusedFilesWebpackPlugin");
  unusedFilesWebpackPlugin.globOptions.ignore.push("**/assets/icons/*.svg", "**/__mocks__/**");

  let cssLocalIdent;
  if (options.mode === "production") {
    cssLocalIdent = "[hash:base64:6]";
  } else {
    cssLocalIdent = "navbar_[path][name]___[local]___[hash:base64:6]";
  }

  // modify the webpack config however you'd like to by adding to this object
  return webpackMerge.smart(defaultConfig, {
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: "navbar",
    },
    module: {
      rules: [
        {
          /* Loads svg images. */
          test: /[/\/]assets[/\/]images[/\/].+\.svg$/,
          exclude: /node_modules/,
          loader: "file-loader",
          options: {
            outputPath: "images",
          },
        },
        {
          /* Loads image assets. */
          test: /\.(gif|jpe?g|png)$/,
          loader: "file-loader",
          options: {
            outputPath: "images",
          },
        },
        {
          /* Loads font resources from "src/assets/fonts" folder. */
          test: /\.(eot|otf|svg|ttf|woff2?)$/,
          include: [/src[/\\]assets[/\\]fonts/],
          loader: "file-loader",
          options: {
            outputPath: "fonts",
          },
        },
        {
          /* Loads SCSS stylesheets. */
          test: /\.scss/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: cssLocalIdent,
                  mode: "local",
                },
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [autoprefixer],
                },
              },
            },
            "resolve-url-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          APPENV: JSON.stringify(process.env.APPENV),
        },
      }),
    ],
    resolve: {
      alias: {
        assets: path.resolve(__dirname, "src/assets"),
        components: path.resolve(__dirname, "src/components"),
        fonts: path.resolve(__dirname, "src/assets/fonts"),
        styles: path.resolve(__dirname, "src/styles"),
        handlebars: path.resolve(
          __dirname,
          "node_modules/handlebars/dist/handlebars.min.js"
        ),
      },
      symlinks: false,
    },
    devServer: {
      port: 3001,
      host: "0.0.0.0",
    },
  });
};
