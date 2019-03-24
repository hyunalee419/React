import React, { useState } from 'react';

const Count = () => {
  const [ count, setCount ] = useState(0);

  return (
    <>
      Count: { count }
      <button onClick={() => setCount(count + 1)}>click me</button>
    </>
  )
};

export default Count;
