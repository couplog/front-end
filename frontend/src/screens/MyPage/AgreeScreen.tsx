import { SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import Header from '../../components/myPage/Header';
import WebView from 'react-native-webview';
import { agree } from '../../utils/uri';

const AgreeScreen = () => {
  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.wrapper}>
        <Header label="개인정보 처리 방침" />
      </View>
      <WebView
        source={{
          uri: agree,
        }}
        style={styles.flex}
      />
    </SafeAreaView>
  );
};

export default AgreeScreen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  wrapper: {
    marginLeft: 25,
    marginRight: 25,
  },
});
