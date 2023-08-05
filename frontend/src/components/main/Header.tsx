import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Logo from '../../assets/images/main/couplog.svg';
import Setting from '../../assets/images/main/setting.svg';

const Header = ({ onPress }: { onPress: () => void }) => {
  return (
    <View style={styles.logoBox}>
      <Logo />
      <TouchableOpacity
        style={styles.icon}
        onPress={onPress}
        activeOpacity={1.0}
      >
        <Setting />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  logoBox: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  icon: {
    position: 'absolute',
    right: -10,
  },
});
