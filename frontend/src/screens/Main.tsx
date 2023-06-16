import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import Header from '../components/main/Header';
import Profile from '../components/main/Profile';
import Footer from '../components/main/Footer';

const Main = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* 임시 배경화면 */}
      <ImageBackground
        source={require('../assets/images/main/background.png')}
        style={{ width: '100%', height: '100%' }}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.margin}>
            {/* Header UI */}
            <Header />

            {/* 유저 프로필 & 연애 day UI */}
            {/* 임시 구현(이미지) */}
            <Profile />
          </View>

          {/* Footer UI */}
          <Footer />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  margin: {
    marginLeft: 25,
    marginRight: 25,
  },
});
