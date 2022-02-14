import React, { Fragment, useState, useCallback, useRef } from 'react';

// 1. 구구단 예제
// https://www.youtube.com/watch?v=XW6mw7yNFxQ&list=PLcqDmjxt30RtqbStQqk-eYMK8N-1SYIFn&index=6
const Gugudan = () => {
  // 곱해야할 숫자들의 state
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9))
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9))
  
  // 정답을 입력했을때 저장되는 state
  const [value, setValue] = useState('')
  // 정답 여부를 노출하기 위한 state
  const [result, setResult] = useState('')

  const inputEl = useRef(null)

  // 정답 입력시 state를 변하게 해주는 콜백함수
  const changeValue = useCallback((e) => {
    console.log('changeValue ::: ', e.target.value)
    setValue(e.target.value)
  }, [])

  // 정답체크
  const onClickForm = useCallback(() => {
    // 입력된 정답이 맞는 답이라면
    if (parseInt(value) === first * second) {
      setResult('정답') // 결과 노출
      // 문제 변경
      setFirst(Math.ceil(Math.random() * 9))
      setSecond(Math.ceil(Math.random() * 9))
      setValue('') // 입력된 정답 초기화
      // input창에 포커싱
      inputEl.current.focus()
    } else { 
      // 오답일경우
      setResult('땡')
      setValue('') // 입력된 정답 초기화
      // input창에 포커싱
      inputEl.current.focus()
    }
  }, [first, second, value])

  return (
    <Fragment>
      <div>
        <h1>구구단예제</h1>
        <h2>{first} 곱하기 {second}는?</h2>
        <input
          ref={inputEl}
          type='number'
          value={value}
          onChange={changeValue}
        />
        <button onClick={onClickForm}>정답체크</button>
      </div>
      <div id={result}>{result}</div>
    </Fragment>
  )
}

export default Gugudan;