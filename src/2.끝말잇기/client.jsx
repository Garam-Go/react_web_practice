// import React from "react";
// import ReactDom from "react-dom";
// import Gugudan from "../1. 구구단/Gugudan";

const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root') // 리액트 핫 로더 적용

const WordRelay = require('./WordRelay');

const Hot = hot(WordRelay)

ReactDom.render(<Hot />, document.querySelector('#root'))