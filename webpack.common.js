const path = require("path");
const { ContextReplacementPlugin } = require("webpack");
const HTMLWebpackPlugin = require('html-webpack-plugin');

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
      template: "./src/index.pug",
      chunks: ['index'],
    }),   
  ],
  resolve: {
    extensions: [".js"],
    alias: {
      ["@wp/assets"]: path.resolve(__dirname, "src/assets"),
      ["@wp/components"]: path.resolve(__dirname, "src/components"),
      ["@wp/lib"]: path.resolve(__dirname, "src/lib"),
      ["@wp/pages"]: path.resolve(__dirname, "src/pages"),
      ["@wp/styles"]: path.resolve(__dirname, "src/styles"),
    },
  },
}

module.exports = webpackConfig;