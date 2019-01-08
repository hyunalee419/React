이 페이지는 Webpack 기본 설정을 통해 React를 실행시키는 방법을 설명하고자 합니다.

## 프로젝트 생성 및 패키지 정보 입력
가장 먼저 프로젝트 세팅을 위한 폴더를 생성합니다.

```
mkdir webpack_sample
```

폴더가 생성되면 폴더로 이동하여 `npm init` 명령어를 쳐줍니다.

```
cd webpack_sample
npm init
```
`npm init` 명령어를 통해 `package.json`을 생성할 수 있습니다.

npm init 명령어를 실행시키면 패키지 정보를 바로 입력할 수 있도록 몇 가지 질문을 물어온다. 이 때 원하는 정보를 입력해 줘도 되고 아니면 Enter 를 눌러 package.json 파일을 우선 생성시킨 후 파일에서 직접 수정해 줘도 된다.

> <strong>npm init 패키지 정보 질문</strong><br/>
package name: (webpack_sample)<br/>
version: (1.0.0)<br/>
description: <br/>
entry point: (index.js)<br/>
test command: <br/>
git repository: <br/>
keywords:<br/>
author:<br/>
lisense: (ISC)

위에 질문 예시를 보고 이미 아시겠지만 추가적인 정보 입력을 하지 않고 Enter로 넘어가면 괄호() 안에 있는 정보가 default로 입력된다.

```
// webpack_sample/package.json
{
  "name": "webpack_sample",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

## 필요 패키지 설치

React 및 Webpack 을 이용하기 위해서는 설치를 먼저 해줘야 한다.
* i == install
* --save-dev == -D ~> devDependencies 에 설치
* --save == -S ~> dependencies 에 설치
* 여러 패키지 한 번에 설치하고 싶으면 패키지명 사이에 한 칸 space로 구분

```
npm i react 
npm i react-dom
npm i webpack --save-dev
npm i webpack-cli --save-dev
npm i uglifyjs-webpack-plugin --save-dev
npm i webpack-dev-server --save-dev
npm i @babel/cli @babel/core @babel/preset-env @babel/preset-react
```
## 예제 파일 생성
### index.html
```
mkdir templates
cd index
mkdir index
touch index.html
```
SPA를 만들 것이 아니기때문에 여러 html를 관리하기 위해 templates 라는 폴더를 생성했습니다. SPA로 프로젝트를 만드실 분들이면 굳이 이렇게 작업 안하시고 CRA(Create React App)처럼 프로젝트 최상단에 index.html 하나만 생성하여 사용하셔도 됩니다.

```
// templates/index/index.html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <title>Webpack + React Sample Project</title>

    <link rel="stylesheet" type="text/css" href="/dist/index/index.css">
</head>
<body>
    // 이 ID 값은 index.js 의 ReactDOM render 시에 사용됩니다.
    <div id="root"></div>
    <script src="/dist/index/index.js"></script>
</body>
</html>
```

## components

```
mkdir src
cd src
mkdir index
cd index
mkdir components

touch index.js
cd components
touch Hello.js
```

components 폴더 구조 또한 templates 과 마찬가지로 SPA가 아니기때문에 templates 하위의 각 페이지 별로 폴더 구조를 나눈다는 생각으로 생성했습니다. 이 부분도 SPA를 구현하시는 분들이라면 자신의 프로젝트에 맡게 변경하시면 됩니다.

```
// src/index/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/Hello';

// index.html 에 작성한 ID 값
ReactDOM.render(<Hello/>, document.getElementById('root'));
```
ReactDOM.render 란 2파라미터에 전달된 곳에 1파라미터의 element를 제어하는 함수이다.

>ReactDOM.render() controls the contents of the container node you pass in. Any existing DOM elements inside are replaced when first called. Later calls use React’s DOM diffing algorithm for efficient updates.<br/>
출처: https://reactjs.org/docs/react-dom.html#render

```
// src/index/components/Hello.js
import React, { Component } from 'react';

export default class Hello extends Component {

 componentDidMount() {
  console.log('good');
 }

 render() {
  return (
   <div>
    캐시워크
   </div>
  )
 }
}
```

## webpack.config.js
프로젝트를 실행시키기 위해서는 webpack 설정을 해줘야 한다. `webpack.config.js` 에서 css (scss), ES6 ->ES5, dev server 설정 등의 여러 작업을 관리할 수 있다.

```
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PATH_SOURCE = path.join(__dirname, '/src');
const PATH_BUILD  = path.join(__dirname, '/dist');

module.exports = {

 entry: {
  index : PATH_SOURCE + '/index/index.js',
 },

 module: {
  rules: [
   {
    test: /\.m?js$/,
    exclude: /node_modules/,
    use: [{
     loader: 'babel-loader',
     options: {
      presets: [
       "@babel/preset-env",
       "@babel/preset-react"
      ]
     }
    }]
   },
  ]
 },

 output: {
  path: PATH_BUILD,
  filename: '[name]/[name].js',
 },

 resolve: {
  modules: [path.join(__dirname, 'src'), 'node_modules'],
  extensions: ['.js', '.jsx', '.css', '.scss', '.json'],
 },

 devServer: {
  port: 8000,
  // host: '0.0.0.0',
  inline: true,
  // hot: true,
  historyApiFallback: {
   index: '/templates/index/index.html'
  },
  publicPath: 'src/',
  contentBase: './'
 }
}
```

## package.json scripts 추가

package.json에 `scripts` 를 추가해 놓으면 긴 명령어를 간편하게 사용할 수 있다. linux의 `alias`를 생각하면 이해하기 쉽다.

```
// package.json
...
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "webpack-dev-server --config webpack.config.js",
  "watch": "webpack --watch",
  "build": "webpack"
},
...
```

## 실행
```
npm run build // js 파일 경로를 알기 위해 한 번 빌드해준다.
npm run dev

localhost:8000 접속
```
![localhost 접속 예제](/ex/webpack_sample.png)
