import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import RepeatOption from './RepeatOption';
import { RepeatProps } from '../../types/anniversary/types';

const Repeat = ({
  repeatStart,
  setRepeatStart,
  setRepeatCode,
  startVisible,
  setStartVisible,
  edit,
}: RepeatProps) => {
  const startOptionVisible = () => {
    setStartVisible(!startVisible);
  };

  const repeatTextStyle = {
    ...styles.text,
    color: repeatStart ? '#000000' : '#909090',
  };

  return (
    <>
      <View style={styles.inputView}>
        <Text style={styles.inputText}>반복</Text>
        <TouchableOpacity
          onPress={edit ? undefined : startOptionVisible}
          activeOpacity={1.0}
          style={styles.placeInputBox}
        >
          {/* 수정일때 분기처리 */}
          {edit ? (
            <Text style={repeatTextStyle}>반복 수정 불가</Text>
          ) : (
            <Text style={repeatTextStyle}>
              {repeatStart ? repeatStart : '없음'}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* 반복 list option */}
      {startVisible && (
        <RepeatOption
          selectedOption={repeatStart}
          setOptionVisible={setStartVisible}
          setSelectedOption={setRepeatStart}
          setRepeatCode={setRepeatCode}
        />
      )}
    </>
  );
};

export default Repeat;

const styles = StyleSheet.create({
  inputView: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: '#000000',
  },
  placeInputBox: {
    width: 155,
    height: 32,
    backgroundColor: '#EDF0F3',
    borderRadius: 8,
    textAlign: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Pretendard-Regular',
    textAlign: 'center',
  },
});
