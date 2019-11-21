const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const cwd = process.cwd();

const buildFolder = 'build';
const distFolder = 'dist';

module.exports = {
  entry: {
    'entry.js': `./${buildFolder}/entry.js`
  },

  output: {
    filename: '[name]',
    path: path.resolve(__dirname, distFolder)
  },

  resolve: {
    alias: {
      '/@webformula/pax-core/index.js': path.resolve(cwd, `${distFolder}/@webformula/pax-core/index.js`)
    }
  },

  plugins: [
    new CopyPlugin([
      // copy css files into root of dist folder
      { from: `./${buildFolder}/*.css`, flatten: true }
    ]),
  ]
};
