const path = require('path'); // Подключение модуля path для работы с путями в файловой системе

const HtmlWebpackPlugin = require('html-webpack-plugin'); // Подключение плагина HtmlWebpackPlugin для работы с HTML файлами

// __dirname — это глобальная переменная в Node.js, 
// которая содержит абсолютный путь к директории, в которой находится текущий исполняемый файл

module.exports = {
  entry: './src/js/index.js', // Указывает главный файл входа (entry point) для сборки JavaScript кода
  output: {
    filename: 'bundle.js', // Имя итогового скомпилированного файла JavaScript
    path: path.resolve(__dirname, 'dist'), // Абсолютный путь к директории, в которую будут выводиться скомпилированные файлы
    clean: true, // Очищает папку output перед каждой сборкой, удаляя старые файлы
  },
  module: {
    rules: [
      {
        test1: /\.js$/, // Применяет правило к файлам с расширением .js
        exclude: /node_modules/, // Исключает папку node_modules, чтобы не обрабатывать её содержимое
        use: {
          loader: 'babel-loader', // Использует Babel для транспиляции JavaScript кода
          options: {
            presets: ['@babel/preset-env'], // Применяет пресет для поддержки современного синтаксиса JavaScript в старых браузерах
          },
        },
      },
 
      {
        test: /\.scss$/, // Применяет правило к файлам с расширением .scss (Sass/SCSS файлы)
        use: ['style-loader', 'css-loader', 'sass-loader'], // Использует цепочку загрузчиков для обработки SCSS в CSS и внедрения в HTML
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Указывает исходный HTML файл для использования в качестве шаблона
      filename: 'index.html', // Имя итогового HTML файла, который будет создан в папке output
    }),
  ],
  mode: 'development', // Устанавливает режим разработки для Webpack, включающий более удобные для отладки настройки
};
