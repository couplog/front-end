import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Plus from '../../assets/images/common/boldPlus.svg';
import Back from '../../assets/images/common/smallBack.svg';
import { HeaderProps } from '../../types/anniversary/types';
import XButton from '../../assets/images/common/xButton.svg';

const Header = ({ onPress, create, isDisabled }: HeaderProps) => {
  const navigation = useNavigation();

  const containerStyle = {
    ...styles.container,
    marginBottom: create ? undefined : -50,
  };

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        activeOpacity={1.0}
        hitSlop={styles.hitSlop}
        onPress={() => navigation.goBack()}
      >
        {create ? <XButton /> : <Back />}
      </TouchableOpacity>

      <TouchableOpacity
        disabled={isDisabled}
        activeOpacity={1.0}
        hitSlop={styles.hitSlop}
        onPress={onPress}
      >
        {create ? <Text style={styles.createText}>추가</Text> : <Plus />}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 25,
  },
  hitSlop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  createText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    fontWeight: '600',
    color: '#000000',
  },
});
