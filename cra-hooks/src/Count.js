import React, { useState, useEffect } from 'react';

const Count = () => {
  const [ count, setCount ] = useState(0);

  useEffect(() => {
    console.log('componentDidMount, componentDidUpdate');
  });

  console.log('render Count');
  return (
    <>
      Count: { count }
      <button onClick={() => setCount(count + 1)}>click me</button>
    </>
  )
};

export default Count;
