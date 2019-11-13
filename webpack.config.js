const path = require('path');
const webpack = require('webpack');

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
  }
};
