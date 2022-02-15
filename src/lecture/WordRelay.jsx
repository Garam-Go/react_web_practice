const React = require('react');
const { useState } = require('react');

const WordRelay = () => {
  const [state, setState] = useState({
    text: 'hello, webpack'
  })

  return (
    <div>
      <h1>{state.text}</h1>
    </div>
  )
};

module.exports = WordRelay;