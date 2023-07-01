import { StyleSheet, View } from 'react-native';
import React from 'react';
import Logo from '../../assets/images/main/couplog.svg';

const Header = () => {
  return (
    <View style={styles.logoBox}>
      <Logo />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  logoBox: {
    alignItems: 'center',
    marginTop: 20,
  },
});
