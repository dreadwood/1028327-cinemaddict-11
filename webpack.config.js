const path = require('path');

module.exports = {
  mode: 'development', // режим сборки
  entry: './src/main.js', // точка входа
  output: { // настройки выходного файла
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },
  devtool: 'source-map',
  devServer: { // настройки сервера
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true // автоматическая перезагрузка страницы
  }
}
