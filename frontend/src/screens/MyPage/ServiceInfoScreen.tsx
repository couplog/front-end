import { SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import Header from '../../components/myPage/Header';
import WebView from 'react-native-webview';
import { service } from '../../utils/uri';

const ServiceInfoScreen = () => {
  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.wrapper}>
        <Header label="서비스 이용약관" />
      </View>

      <WebView
        source={{
          uri: service,
        }}
        style={styles.flex}
      />
    </SafeAreaView>
  );
};

export default ServiceInfoScreen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  wrapper: {
    marginLeft: 25,
    marginRight: 25,
  },
});
