import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import { TitleInputProps } from '../../types/anniversary/types';

const TitleInput = ({ title, setTitle }: TitleInputProps) => {
  return (
    <View style={{ marginTop: 20 }}>
      <TextInput
        style={styles.inputStyle}
        placeholder="기념일 제목 (1-10자)"
        placeholderTextColor="#909090"
        maxLength={10}
        onChangeText={(text) => setTitle(text)}
        value={title}
      />
    </View>
  );
};

export default TitleInput;

const styles = StyleSheet.create({
  inputStyle: {
    fontSize: 24,
    fontFamily: 'Pretendard-Medium',
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },
});
