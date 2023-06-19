import { Platform, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View
      style={{
        ...styles.headerView,
        marginTop: Platform.OS === 'android' ? 20 : 5,
      }}
    >
      <View style={styles.logoBox}>
        <Text style={styles.logoText}>로고</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoBox: {
    width: 100,
    height: 32,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontFamily: 'Pretendard-Regular',
  },
});
