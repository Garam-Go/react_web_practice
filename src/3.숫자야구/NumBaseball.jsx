import React, { Fragment, ReactDom, useCallback, useState } from 'react';
const getNumbers = () => { // 숫자 4개를 겹치지않고 랜덤하게 뽑는 함수

}

const NumBaseball = () => {
  const [answer, setAnswer] = useState(getNumbers()) // 맞출 문제 (4가지 숫자)
  const [result, setResult] = useState() // 제출한 답에 대한 결과
  const [value, setValue] = useState() // 현재 내가 입력한 답
  const [tries, setTries] = useState(['1', '2', '3', '4', '5']) // 내가 시도한 답안

  // input onChange Event
  const onChange = useCallback(() => {

  }, [])

  // 답안제출
  const onSubmit = useCallback(() => {

  }, [])

  const inputRenderer = useCallback(() => {
    const inputParams = {
      maxLength: 4,
      value: value,
      onChange: (e) => {

      },
      onKeyUp: (k) => {

      } 
    }
    return (
      <input {...inputParams}/>
    )
  }, [value])

  return (
    <Fragment>
      <h1>{result}</h1>
      {inputRenderer()}
      <div>시도횟수: {tries.length}</div>
      <ul>
        {tries.map((key, i) => {
          return (
            <li>{key}</li>
          )
        })}
      </ul>
    </Fragment>
  )
}

export default NumBaseball