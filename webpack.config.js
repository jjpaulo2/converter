const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: 'js/bundle.min.js',
    path: path.resolve(__dirname, 'public/static'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
            from: "**/pdfjs-dist/build/pdf.worker.min.mjs",
            to: "js/pdf.worker.min.mjs"
        },
        {
          from: "**/bootstrap/dist/js/bootstrap.bundle.min.js",
          to: "js/bootstrap.bundle.min.js"
        },
        {
          from: "**/bootstrap/dist/css/bootstrap.min.css",
          to: "css/bootstrap.min.css"
        },
        {
          from: "**/bootstrap-icons/font/bootstrap-icons.min.css",
          to: "css/bootstrap-icons.min.css"
        },
        {
          from: "**/bootstrap-icons/font/fonts/bootstrap-icons.woff",
          to: "css/fonts/bootstrap-icons.woff"
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 5500,
  },
};