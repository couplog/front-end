/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { RecoilRoot } from 'recoil';
import Register from './src/screens/Register';

function App() {
  return (
    <RecoilRoot>
      <Register />
    </RecoilRoot>
  );
}

export default App;
