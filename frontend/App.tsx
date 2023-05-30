/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { RecoilRoot } from 'recoil';
import { SafeAreaView, Text, View } from 'react-native';
import ButtonComponent from './src/components/design/ButtonComponent';
import Login from './src/screens/Login';

function App() {
  return (
    <RecoilRoot>
      <SafeAreaView>
        <View>
          <Login/>
        </View>
      </SafeAreaView>
    </RecoilRoot>
  );
}

export default App;
