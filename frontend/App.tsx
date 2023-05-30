/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { RecoilRoot } from 'recoil';
import RegisterPhoneNum from './src/screens/RegisterPhoneNum';
import RegisterUserInfo from './src/screens/RegisterUserInfo';

function App() {
  return (
    <RecoilRoot>
      <RegisterUserInfo />
    </RecoilRoot>
  );
}

export default App;
