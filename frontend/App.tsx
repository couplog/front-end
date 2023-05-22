/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { RecoilRoot } from 'recoil';
import { SafeAreaView, Text, View } from 'react-native';

function App() {
  return (
    <RecoilRoot>
      <SafeAreaView>
        <View>
          <Text>Test</Text>
          <Text>Test 2</Text>
        </View>
      </SafeAreaView>
    </RecoilRoot>
  );
}

export default App;
