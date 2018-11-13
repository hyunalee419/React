import React from 'react';
import { SampleConsumer } from '../contexts/sample';

const Receives = () => {
  return (
    <SampleConsumer>
      {
        ({state}) => (
          <div>
            현재 설정된 값: {state.value}
          </div>
        )
      }
    </SampleConsumer>
  )
}

export default Receives;
