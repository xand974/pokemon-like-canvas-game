const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (rootDir, {
  inputTsFiles = [],
  contentScriptTsFiles = [],
}) => (env, argv) => ['web'].map(browser => {
  // make sure to override "__dirname"!
  __dirname = rootDir;
  const IS_PROD = Boolean(argv && argv.mode === 'production');
  const IS_DEV = !IS_PROD;
  const replacements = {
    $IS_DEV: IS_DEV,
    $IS_PROD: IS_PROD,
  };

  return ({
    mode: IS_PROD ? 'production' : 'development',

    entry: Object.fromEntries([...inputTsFiles, ...contentScriptTsFiles].map(file => [file, `./src/${file}.ts`])),

    devtool: IS_PROD ? '' : 'inline-source-map',

    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      openPage: '/index',
      open: true,
    },

    performance: {
      hints: IS_PROD ? "warning" : false
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, `dist`)
    },

    resolve: {
      extensions: ['.ts', '.js']
    },

    module: {
      rules: [
        {   // Replace all placeholders - $IS_FIREFOX / $IS_CHROME / $IS_PROD / $IS_DEV
          test: /\.tsx?$/,
          loader: 'string-replace-loader',
          options: {
            multiple: Object.entries(replacements)
              .map(([search, replace]) => ({
                search: escapeRegExp(search),
                replace: String(replace),
                flags: 'g'
              }))
          }
        },
        {   // TypeScript loader
          test: /\.tsx?$/,
          include: path.resolve(__dirname, 'src'),
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: IS_DEV,
                experimentalWatchApi: true,
              },
            },
          ],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader"
          ]
        },
      ]
    },

    plugins: [
      new ProgressBarPlugin(),

      new CopyPlugin(['src'].map(from => ({
        from,
        to: '',
        ignore: ['*.js', '*.ts', '*.git'],    // ignore JavaScript in src
      }))),

      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),

      ...inputTsFiles.map(path => new HtmlWebpackPlugin({
        inject: true,
        chunks: [path],
        filename: `${path}.html`,
        template: `src/${path}.html`,
      })),

      new HTMLInlineCSSWebpackPlugin({
        leaveCSSFile: true,
      }),


    ],
  });
});

function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
