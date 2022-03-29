
const webpackConfig = require('./src/utils/build_tools/webpack.config.builder');

module.exports = webpackConfig(__dirname, {
  inputTsFiles: [
    'index/index',
  ],
});

