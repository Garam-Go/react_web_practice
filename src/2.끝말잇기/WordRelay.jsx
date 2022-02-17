const React = require('react');
const { useState, useRef, Fragment, useCallback } = require('react');

const WordRelay = () => {
  const [word, setWord] = useState('리액트')
  const [value, setValue] = useState('')
  const [result, setResult] = useState('')

  const inputEl = useRef(null)

  // input 입력시 state를 변하게 해주는 콜백함수
  const changeValue = useCallback((e) => {
    console.log('changeValue ::: ', e.target.value)
    // input입력시 저장된 value값 변경
    setValue(e.target.value)
  }, [])

  // 정답체크
  const onClickForm = useCallback(() => {
    console.log('answer :::', value)
    
    // 입력된 글자의 첫번째가 이전단어 끝자리와 같을경우
    if (value[0] === word[word.length -1]) {

      setResult('정답')// 결과 노출
      setWord(value) // 문제 변경
      setValue('') // 입력창 초기화
      // input창에 포커싱
      inputEl.current.focus()
    } else { 
      // 오답일경우
      setResult('땡')// 결과 노출
      setWord(word) // 문제 변경
      setValue('') // 입력창 초기화
      // input창에 포커싱
      inputEl.current.focus()
    }
  }, [value, word])

  const inputRenderer = useCallback(() => {
    const inputParam = {
      ref: inputEl,
      type: 'text',
      value: value,
      onChange: (e) => { // input 변경시 발생하는 이벤트
        changeValue(e)
      },
      onKeyUp: (e) => { // 키보드 입력시 발생
        // console.log('keyup ::: ', e)
        if (e.keyCode === 13) { // 엔터키 입력시
          onClickForm(e)
        }
      }
    }
    return (<input {...inputParam}/>)
  }, [changeValue, onClickForm, value])

  return (
    <Fragment>
      <div>
        <h1>끝말잇기 예제</h1>
        <h2>제시어 : {word}</h2>
        {inputRenderer()}
        <button onClick={onClickForm}>정답체크</button>
        <h2>리액트 핫 로더</h2>
      </div>
      <div id={result}>{result}</div>
    </Fragment>
  )
};

module.exports = WordRelay;