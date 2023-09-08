import path from 'path';
import url from 'url';
import webpack from 'webpack';
import { createRequire } from 'module';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const require = createRequire(import.meta.url);
const dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default (env) => ({
  entry: './src/app.jsx',
  mode: process.env.production ? 'production' : 'development',
  devtool: 'source-map',
  output: {
    path: path.resolve(dirname, 'release'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),

    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
});
