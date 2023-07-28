import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Arrow from '../../assets/images/common/smallBack.svg';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerFlex}>
      <TouchableOpacity
        activeOpacity={1.0}
        onPress={() => navigation.goBack()}
        style={styles.icon}
      >
        <Arrow />
      </TouchableOpacity>

      <Text style={styles.text}>설정</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerFlex: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  icon: {
    position: 'absolute',
    left: 0,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: '#000000',
  },
});
