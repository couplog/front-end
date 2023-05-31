import React from 'react';
import { RecoilRoot } from 'recoil';
import MainRoute from './src/routes/MainRoute';

function App() {
  return (
    <RecoilRoot>
      <MainRoute />
    </RecoilRoot>
  );
}

export default App;
