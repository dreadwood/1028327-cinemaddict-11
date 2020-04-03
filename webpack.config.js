const path = require('path');

module.exports = {
  mode: 'develompment',
  entry: './src/main.js',
  output: {
    filename: 'build.js',
    path: path.join(__dirname, 'public')
  },
  devtool: 'source-map'
}
