import React, { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { RecoilRoot } from 'recoil';
import MainRoute from './src/routes/MainRoute';

function App() {
  // 다크모드 UI가 없기 때문에 ios status bar 고정 설정
  useEffect(() => {
    StatusBar.setBarStyle(Platform.OS === 'ios' ? 'dark-content' : 'default');
  }, []);

  return (
    <RecoilRoot>
      <MainRoute />
    </RecoilRoot>
  );
}

export default App;
