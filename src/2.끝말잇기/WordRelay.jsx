const React = require('react');
const { useState, useRef, Fragment, useCallback } = require('react');

const WordRelay = () => {
  const [state, setState] = useState({
    word: '리액트',
    value: '',
    result: ''
  })

  const inputEl = useRef(null)

  // input 입력시 state를 변하게 해주는 콜백함수
  const changeValue = useCallback((e) => {
    console.log('changeValue ::: ', e.target.value)
    // input입력시 value값만 변하고 나머지는 그대로하도록 ...state사용
    setState({...state, value: e.target.value})
  }, [state])

  // 정답체크
  const onClickForm = useCallback(() => {
    console.log('answer :::', state.value)
    
    // 입력된 글자의 첫번째가 이전단어 끝자리와 같을경우
    if (state.value[0] === state.word[state.word.length -1]) {
      setState({
        result: '정답', // 결과 노출
        word: state.value, // 문제 변경
        value: '' // 입력된 정답 초기화
      })
      // input창에 포커싱
      inputEl.current.focus()
    } else { 
      // 오답일경우
      setState({
        result: '땡', // 결과 노출
        word: state.word,
        value: '' // 입력된 정답 초기화
      })
      // input창에 포커싱
      inputEl.current.focus()
    }
  }, [state.value, state.word])

  const inputRenderer = useCallback(() => {
    const inputParam = {
      ref: inputEl,
      type: 'text',
      value: state.value,
      onChange: (e) => {
        changeValue(e)
      },
      onKeyUp: (e) => {
        // console.log('keyup ::: ', e)
        if (e.keyCode === 13) {
          onClickForm(e)
        }
      }
    }
    return (<input {...inputParam}/>)
  }, [changeValue, onClickForm, state.value])

  return (
    <Fragment>
      <div>
        <h1>끝말잇기 예제</h1>
        <h2>제시어 : {state.word}</h2>
        {inputRenderer()}
        <button onClick={onClickForm}>정답체크</button>
      </div>
      <div id={state.result}>{state.result}</div>
    </Fragment>
  )
};

module.exports = WordRelay;