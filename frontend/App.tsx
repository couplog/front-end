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
import Login from './src/screens/Login';

function App() {
  return (
    <RecoilRoot>
      {/* <RegisterPhoneNum /> */}
      <Login/>
    </RecoilRoot>
  );
}

export default App;
