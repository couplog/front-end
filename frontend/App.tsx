import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Platform, StatusBar } from 'react-native';
import { RecoilRoot } from 'recoil';
import MainRoute from './src/routes/MainRoute';
import RegisterUserInfo from './src/screens/RegisterUserInfo';

function App() {
  // 다크모드 UI가 없기 때문에 ios status bar 고정 설정
  useEffect(() => {
    StatusBar.setBarStyle(Platform.OS === 'ios' ? 'dark-content' : 'default');
  }, []);

  // splash screen
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <RecoilRoot>
      <MainRoute />
    </RecoilRoot>
  );
}

export default App;
