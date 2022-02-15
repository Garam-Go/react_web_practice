const path = require('path')
const webpack = require('webpack')

module.exports ={
  name: 'word-relay-setting',
  mode: 'development', // 개발용
  devtool: 'eval', // 빠르게 개발툴
  resolve: {
    extensions: ['.js', '.jsx'] // 파일확장자 통합
  },
  
  // 중요한거
  entry: { // 입력
    // app: ['./client.jsx', './WordRelay.jsx']
    app: ['./client'] // client파일 안에 WordRelay 파일을 호출하고있어서 하나만 호출
  },
  // ↓
  module: {
    rules: [{ // 모듈의 규칙
        test: /\.jsx?/, // 정규식으로 모듈을 사용할 파일들 적용
        loader: 'babel-loader', // 어떤 로더를 쓸것인지
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
  // ↓
  output: { // 출력
    path: path.join(__dirname, 'dist'), // 현재 폴더경로에서 dist폴더를 합쳐줌
    filename: 'app.js'
  }
};