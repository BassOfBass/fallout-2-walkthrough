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
      template: "./src/pages/home.pug",
      chunks: ['index'],
    }),
    new HTMLWebpackPlugin({
      filename: 'areas/index.html',
      template: "./src/pages/areas/areas.pug",
      chunks: ['index'],
    }),
    new HTMLWebpackPlugin({
      filename: 'addenda/index.html',
      template: "./src/pages/addenda.pug",
      chunks: ['index'],
    }),
    // new HTMLWebpackPlugin({
    //   filename: 'car/index.html',
    //   template: "./src/pages/car.pug",
    //   chunks: ['index'],
    // }),
    // new HTMLWebpackPlugin({
    //   filename: 'character-design/index.html',
    //   template: "./src/pages/character-design.pug",
    //   chunks: ['index'],
    // }),
    // new HTMLWebpackPlugin({
    //   filename: 'combat/index.html',
    //   template: "./src/pages/combat.pug",
    //   chunks: ['index'],
    // }),
    // new HTMLWebpackPlugin({
    //   filename: 'companions/index.html',
    //   template: "./src/pages/companions.pug",
    //   chunks: ['index'],
    // }),
    // new HTMLWebpackPlugin({
    //   filename: 'encounters/index.html',
    //   template: "./src/pages/encounters.pug",
    //   chunks: ['index'],
    // }),
    // new HTMLWebpackPlugin({
    //   filename: 'endings/index.html',
    //   template: "./src/pages/endings.pug",
    //   chunks: ['index'],
    // }),
    // new HTMLWebpackPlugin({
    //   filename: 'index/index.html',
    //   template: "./src/pages/index.pug",
    //   chunks: ['index'],
    // }),
    // new HTMLWebpackPlugin({
    //   filename: 'items/index.html',
    //   template: "./src/pages/items.pug",
    //   chunks: ['index'],
    // }),
    // new HTMLWebpackPlugin({
    //   filename: 'preparations/index.html',
    //   template: "./src/pages/preparations.pug",
    //   chunks: ['index'],
    // }),
    // new HTMLWebpackPlugin({
    //   filename: 'stupid/index.html',
    //   template: "./src/pages/stupid.pug",
    //   chunks: ['index'],
    // }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, "public") }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/i,
        loader: 'pug-loader',
        options: {
          root: path.resolve(__dirname, "src")
        }
      },
    ]
  },
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