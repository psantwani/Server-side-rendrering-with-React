const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  // Inform webpack that we're building a bundle
  // for nodeJS, rather than for the browser
  target: 'node',

  // Tell webpack the root file of our
  // server application
  entry: './src/index.js',

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  //Tell webpack to run babel on every file it runs through
  module: {
    rules: [
      {
        test: /\.js?$/, //apply babel to only JS files
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          //tells our babel-loader to use the following options
          presets: [
            'react', //conver the JSX
            'stage-0' //to handle async code
            ['env', { target: { browsers: ['last 2 versions']}}] //run rules to make the final code compatible with the last 2 versions of the browser
          ]
        }
      }
    ]
  },

  /**
   * webpackNodeExternals - 
   * when we import libaries like express, react, etc it gets bundled into our bundle.js by webpack. We want that for our browser code.
   * For our server side we dont want to do that. It will not get shipped to the browser. In node we can require libraries on runtime. 
   * To avoid  these libraries load up into our bundle.js, we use webpackNodeExternals. Anything inside node_modules folder will not be in bundle.js now.
   * This will make our webpack process faster. 
   */
  externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);
