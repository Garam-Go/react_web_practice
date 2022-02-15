const path = require('path')

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
          presets: ['@babel/preset-env', '@babel/preset-react'] // 설치된 프리셋 적용
        }
    }],
  }, 
  // ↓
  output: { // 출력
    path: path.join(__dirname, 'dist'), // 현재 폴더경로에서 dist폴더를 합쳐줌
    filename: 'app.js'
  }
};