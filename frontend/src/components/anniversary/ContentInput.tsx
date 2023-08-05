import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { ContentInputProps } from '../../types/anniversary/types';

const ContentInput = ({ content, setContent }: ContentInputProps) => {
  return (
    <View style={{ marginTop: 50 }}>
      <Text style={styles.inputText}>내용</Text>
      <TextInput
        style={styles.contentInputBox}
        placeholder="일정 내용을 입력하세요. (0-80자)"
        placeholderTextColor="#909090"
        value={content}
        onChangeText={(text) => setContent(text)}
        maxLength={80}
        multiline
      />
    </View>
  );
};

export default ContentInput;

const styles = StyleSheet.create({
  inputText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: '#000000',
  },
  contentInputBox: {
    width: '100%',
    height: 130,
    marginTop: 15,
    borderRadius: 8,
    padding: 10,
    paddingTop: 10,
    color: '#000000',
    backgroundColor: '#EDF0F3',
    fontFamily: 'Pretendard-Regular',
  },
});
