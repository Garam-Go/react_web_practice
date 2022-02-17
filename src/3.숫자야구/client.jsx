// import React from "react";
// import ReactDom from "react-dom";
// import Gugudan from "../1. 구구단/Gugudan";

import React from'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root' // 리액트 핫 로더 적용

import NumBaseball from './NumBaseball';

const Hot = hot(NumBaseball)

ReactDom.render(<Hot />, document.querySelector('#root'))