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
import ConnectPartner from './src/screens/ConnectPartner';

function App() {
  return (
    <RecoilRoot>
      {/* <RegisterPhoneNum /> */}
      {/* <Login/> */}
      <ConnectPartner/>
    </RecoilRoot>
  );
}

export default App;
