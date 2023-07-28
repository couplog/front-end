import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useResetRecoilState } from 'recoil';
import Plus from '../../assets/images/common/boldPlus.svg';
import Back from '../../assets/images/common/smallBack.svg';
import { HeaderProps } from '../../types/anniversary/types';
import XButton from '../../assets/images/common/xButton.svg';
import { editAnniversaryState } from '../../state/atoms/editAnniversary';

const Header = ({
  onPress,
  create,
  edit,
  isDisabled,
  handleMain,
}: HeaderProps) => {
  const navigation = useNavigation();
  const reset = useResetRecoilState(editAnniversaryState);

  const containerStyle = {
    ...styles.container,
    marginBottom: create || edit ? undefined : -50,
  };

  // 화면 뒤로 이동 및, 값 reset
  const handleBack = () => {
    edit && reset(); // edit이 true일 때만 초기환
    navigation.goBack();
  };

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        activeOpacity={1.0}
        hitSlop={styles.hitSlop}
        onPress={edit || create ? handleBack : handleMain}
      >
        {create || edit ? <XButton /> : <Back />}
      </TouchableOpacity>

      <TouchableOpacity
        disabled={isDisabled}
        activeOpacity={1.0}
        hitSlop={styles.hitSlop}
        onPress={onPress}
      >
        {create || edit ? (
          <Text style={styles.createText}>{edit ? '수정' : '추가'}</Text>
        ) : (
          <Plus style={{ left: 10 }} />
        )}
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
