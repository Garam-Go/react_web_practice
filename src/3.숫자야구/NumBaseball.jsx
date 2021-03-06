import React, { Fragment, useCallback, useState } from 'react';
import Try from './Try'

const ANSWER_MAX_LENGTH = 4;

const getNumbers = () => { // 숫자 4개를 겹치지않고 랜덤하게 뽑는 함수
  const candidate = [1,2,3,4,5,6,7,8,9]
  const array = []
  for (let i = 0; i < 4; i += 1) {
    const choosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0]
    array.push(choosen)
  }
  return array
}

// input 입력된 숫자가 4자리 이상일경우
const inputMaxLength = (value) => {
  let num = value
  if (value.length > ANSWER_MAX_LENGTH) {
    num = num.slice(0, ANSWER_MAX_LENGTH)
  }
  return num
}

// 문제 4자리수를 가리는 로직
const convertAnswer = (value) => {
  const hide = value.join('').replace(/./gi, '*')
  console.log(value, hide)
  return hide
}

// 숙제
// 2. 힌트 기능 추가해보기

const NumBaseball = () => {
  const [answer, setAnswer] = useState(getNumbers()) // 맞출 문제 (4가지 숫자) ex) [1,3,5,7]
  const [hint, setHint] = useState(convertAnswer(answer)) // 사용자에게 보여줄 문제 4자리수
  const [result, setResult] = useState() // 제출한 답에 대한 결과
  const [value, setValue] = useState('') // 현재 내가 입력한 답
  const [tries, setTries] = useState([]) // 내가 시도한 답안

  // 힌트기능
  const getHint = useCallback(() => {
    // 클릭시 정답에서 맨 앞자리 한자리만 노출
    const hintValue = answer.slice(0, 1)[0]
    const hidevalue = answer.slice(1)
    console.log('hint ::: ', hintValue, hidevalue)
    setHint(hintValue + convertAnswer(hidevalue))
  }, [answer])

  // input onChange Event
  const onChange = useCallback((changeValue) => {
    const maxCut = inputMaxLength(changeValue)
    console.log('onChange ::: ', maxCut)
    setValue(maxCut)
  }, [])

  // 답안제출
  const onSubmit = useCallback(() => {
    // join = 특정 배열을 하나의 문자열로 만듬
    // join(,) = 특정 배열의 숫자를 , 로 구분지어서 하나의 문자열로 만듬
    // [1,2,3,4].join(,) = 1,2,3,4
    if (value === answer.join('')) { // 정답 맞춘경우 (문제를 공백으로 join = 4자리 문자열로 변환)
      setResult('홈런! 게임을 다시 시작합니다.')
      alert('홈런! 게임을 다시 시작합니다.')
      setValue('')
      setAnswer(getNumbers())
      setTries([])
      setHint(convertAnswer(answer))
    } else {
      const answerArray = value.split('').map((v) => parseInt(v)) // 내가 입력한 값을 4자리 int화
      let strike = 0 // 입력한 값중 문제의 위치까지 같이 맞은경우
      let ball = 0 // 입력한 값중 위치는 틀리지만 숫자는 있는경우
      if (tries.length === 9) { // 10회 이상 오답
        setResult(`10회 이상 틀려서 실패. 정답은 ${answer.join(',')}입니다.`)
        setValue('')
        setAnswer(getNumbers())
        setTries([])
        setHint(convertAnswer(answer))
      } else { // 10회 미만 틀릴경우
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) { // 입력한 숫자가 해당 문제 자릿수의 숫자와 맞을경우
            strike += 1
          } else if (answer.includes(answerArray[i])) { // 입력한 숫자가 위치는 틀렸는데 문제에는 있을경우
            ball += 1
          }
          setResult('틀렸습니다.')
          setTries([...tries, {try: value, result: `${strike} 스트라이크, ${ball}볼`}])
          setValue('')
        }
      }
    }
  }, [answer, tries, value])

  const inputRenderer = useCallback(() => {
    const inputParams = {
      maxlength: ANSWER_MAX_LENGTH,
      type: 'number',
      value: value,
      onChange: (e) => {
        onChange(e.target.value)
      },
      onKeyUp: (k) => {
        // 엔터키 클릭시
        if (k.keyCode === 13) {
          onSubmit(k.target.value)
        }
      },
    }
    return (
      <input {...inputParams}/>
    )
  }, [onChange, onSubmit, value])

  return (
    <Fragment>
      <h1>숫자야구</h1>
      <p>
        랜덤한 4자리의 숫자를 입력해보세요.<br/>
        규칙 : 입력한 4자리의 숫자를 문제와 비교하게 됩니다.<br/><br/>
        입력한 글자가 <br/>
        1. 문제의 4자리수 중 위치, 숫자가 같은경우 1글자당 1스트라이크<br/>
        2. 문제의 4자리수 중 위치가 다르지만 동일한 숫자기 있을경우 1글자당 1볼
      </p>
      <h2>문제 : {hint}</h2>
      <button onClick={getHint}>힌트?</button>
      <p>힌트 클릭시 첫번째 문자가 노출됩니다.</p>
      {inputRenderer()}
      <button onClick={onSubmit}>정답입력</button>
      <p>{result}</p>
      <div>시도횟수: {tries.length}</div>
      <ul>
        {tries.map((key, i) => {
          return (
            <Try value={`입력한 답: ${key.try}, 결과: ${key.result}`} index={i}/>
            // <li>{key}</li>
          )
        })}
      </ul>
    </Fragment>
  )
}

export default NumBaseball