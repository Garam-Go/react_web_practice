import React from 'react';

// 내가 시도한 배열을 가지고 list 노출하도록 렌더링 하는 컴포넌트
const Try = ({ value, index }) => {
  console.log('try component :: value=%o, index=%o', value, index)
  return (
    <li key={index}>{value}</li>
  );
}

export default Try;