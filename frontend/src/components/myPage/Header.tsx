import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Arrow from '../../assets/images/common/smallBack.svg';
import { MyPageHeaderProps } from '../../types/myPage/types';

const Header = ({ password, onPress, disabled }: MyPageHeaderProps) => {
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.headerFlex,
        { justifyContent: password ? 'flex-end' : 'center' },
      ]}
    >
      <TouchableOpacity
        activeOpacity={1.0}
        onPress={() => navigation.goBack()}
        style={styles.icon}
      >
        <Arrow />
      </TouchableOpacity>

      <TouchableOpacity
        disabled={disabled}
        activeOpacity={1.0}
        onPress={onPress}
      >
        <Text style={styles.text}>{password ? '확인' : '설정'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerFlex: {
    flexDirection: 'row',
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
