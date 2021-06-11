const path = require("path");
const { ContextReplacementPlugin } = require("webpack");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const { supportedLanguages } = require("./configs/derived-vars");

/**
 * @type {import("webpack").Configuration}
 */
const webpackConfig = {
  entry: {
    index: "./src/index.js",
  },
  plugins: [
    new ContextReplacementPlugin(
      /date\-fns[\/\\]/,
      new RegExp(`[/\\\\\](${supportedLanguages.join('|')})[/\\\\\]index\.js$`)
    ),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: "./src/pages/index.pug",
      chunks: ['index'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, "public") }
      ]
    })
  ],
  resolve: {
    extensions: [".js"],
    alias: {
      ["@/assets"]: path.resolve(__dirname, "src/assets"),
      ["@/components"]: path.resolve(__dirname, "src/components"),
      ["@/lib"]: path.resolve(__dirname, "src/lib"),
      ["@/pages"]: path.resolve(__dirname, "src/pages"),
      ["@/styles"]: path.resolve(__dirname, "src/styles"),
    },
  },
}

module.exports = webpackConfig;