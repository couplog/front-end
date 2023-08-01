import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { editModeState } from '../../../state/atoms/createEditModeAtom';

const Footer = ({ onPress }: { onPress: () => void }) => {
  const createEditMode = useRecoilValue(editModeState);

  return (
    <View style={{ marginBottom: 60 }}>
      <TouchableOpacity onPress={onPress} activeOpacity={1.0}>
        <Text style={styles.text}>
          {createEditMode.mode ? '일정 수정 취소' : '일정 등록 취소'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  text: {
    color: '#E53C3CB2',
    fontFamily: 'Pretendard-Regular',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontWeight: '600',
  },
});
