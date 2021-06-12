const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const HTMLWebpackPlugin = require("html-webpack-plugin");

/**
 * @type {import("webpack-dev-server").Configuration}
 */
const devServerConfig = {
  host: '0.0.0.0',
  port: 3000,
  publicPath: "/",
  contentBase: path.resolve(__dirname, "public"),
  watchContentBase: true
};

/**
 * @type {import("webpack").Configuration}
 */
const config = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: devServerConfig,
  entry: {},
  plugins: [
    // @ts-expect-error
    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
      chunkFilename: "styles/[id].css"
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            ['@babel/plugin-transform-runtime']
          ]
        }
      },
      {
        test: /\.(c|s[ac])ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          { 
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: "assets/images/[name][ext][query]"
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: "assets/fonts/[name][ext][query]"
        }
      },
    ]
  },
  output: {
    path: path.resolve(__dirname, "dev"),
    filename: "scripts/[name].bundle.js",
    assetModuleFilename: "assets/[name][ext][query]",
  }
}

module.exports = merge(common, config);