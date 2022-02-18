import React from 'react';

const styles = {
  fontSize: 16
}

// 내가 시도한 배열을 가지고 list 노출하도록 렌더링 하는 컴포넌트
const Try = ({ value, index }) => {
  console.log('try component :: value=%o, index=%o', value, index)
  return (
    <li className={styles.tryList} key={index} style={styles}>
      {value}
    </li>
  );
}

export default Try;