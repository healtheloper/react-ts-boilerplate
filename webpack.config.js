const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

dotenv.config();

const mode = process.env.NODE_ENV || 'development';

const PORT = 3000;

const getPublicUrl = () => {
  const envPublicUrl = process.env.PUBLIC_URL;
  if (envPublicUrl) {
    return envPublicUrl.endsWith('/') ? envPublicUrl : envPublicUrl + '/';
  }
  const homepage = require('./package.json').homepage;
  if (homepage) {
    return homepage.endsWith('/') ? homepage : homepage + '/';
  }
  return '/';
};

const env = { ...process.env, PUBLIC_URL: getPublicUrl() };

module.exports = {
  mode,
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new InterpolateHtmlPlugin(env),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    host: 'localhost',
    port: PORT,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  ...(mode === 'development' ? { devtool: 'source-map' } : {}),
};
