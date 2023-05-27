/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';
import { SafeAreaView, Text, View } from 'react-native';
import ButtonComponent from './src/components/design/ButtonComponent';

function App() {
  const [disabled, setDisabled] = useState(true);
  console.log(disabled);

  return (
    <RecoilRoot>
      <SafeAreaView>
        <View>
          {/* 회원가입 버튼 예시 */}
          <ButtonComponent onPress={() => console.log('가입하기')} disabled text="가입하기" font="bold" />
          <View style={{ marginTop: 70 }}>
            <ButtonComponent onPress={() => console.log('인증완료')} disabled={false} text="인증완료" font="bold" />
          </View>
          <View style={{ marginTop: 70 }}>
            <ButtonComponent onPress={() => console.log('인증완료')} disabled text="인증완료" font="bold" />
          </View>

          {/* 로그인, 가입하기, 연결하기 버튼 예시 */}
          <View style={{ marginTop: 100 }}>
            <ButtonComponent onPress={() => console.log('연결하기')} disabled={false} text="연결하기" font="bold" />
          </View>
          <View style={{ marginTop: 70 }}>
            <ButtonComponent onPress={() => console.log('로그인')} disabled={false} text="로그인" font="bold" />
          </View>

          {/* 시작하기 버튼 예시 */}
          <View style={{ marginTop: 120 }}>
            <ButtonComponent onPress={() => console.log('시작하기')} disabled={false} text="시작하기" font="bold" />
          </View>

          {/* 코드 복사하기 버튼 예시 */}
          <View style={{ marginTop: 120 }}>
            <ButtonComponent onPress={() => console.log('시작하기')} disabled={false} text="코드 복사하기" font="regular" />
          </View>
        </View>
      </SafeAreaView>
    </RecoilRoot>
  );
}

export default App;
