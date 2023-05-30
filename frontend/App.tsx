/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { RecoilRoot } from 'recoil';
import RegisterPhoneNum from './src/screens/RegisterPhoneNum';

function App() {
  return (
    <RecoilRoot>
      <RegisterPhoneNum />
    </RecoilRoot>
  );
}

export default App;
