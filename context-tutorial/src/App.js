import React, { Component } from 'react';
import LeftPane from './components/LeftPane';
import RightPane from './components/RightPane';
import { SampleProvider } from './contexts/sample';

const App = () => {
  return (
    <SampleProvider>
      <div className="panes">
        <LeftPane />
        <RightPane />
      </div>
    </SampleProvider>
  );
};

export default App;
