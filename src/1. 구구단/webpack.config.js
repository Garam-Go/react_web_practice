const path = require('path')
const webpack = require('webpack')
module.exports = {
  mode: 'development',
  devtool: 'eval', // hidden source map
  resolve: {
    extensions: ['.jsx', '.js']
  },


  entry: {
    app: './client'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: [ // preset => plugin들의 모음
          ['@babel/preset-env', { // 각 프리셋별로 설정 적용
            targets: { // 자동으로 옛날 브라우저 지원
              browsers: ['> 5% in KR','last 2 chrome versions'], // 원하는 브라우저만 적용
              // 한국에서 점유율 5퍼이상, 크롬버전 최신 2버전 전 버전까지
            },
            debug: true,
          }],
          '@babel/preset-react'],
        plugins: []
      }
    }],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true })
  ],
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist')
  }
}