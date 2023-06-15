import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ButtonProps } from '../../types/components/buttonType';

const ButtonComponent = ({ disabled, text, onPress, font }: ButtonProps) => {
  // 버튼 스타일 분기처리
  const buttonStyle = {
    ...styles.buttonContainer,
    ...(disabled ? styles.disabledButtonContainer : {}),
    ...(text === '시작하기' ? styles.onboardingButtonContainer : {}),
    ...(text === '코드 복사하기' ? styles.copyButtonContainer : {}),
  };

  // 텍스트 스타일 분기처리
  const textStyle = {
    fontFamily:
      font === 'bold'
        ? 'Pretendard-Bold'
        : font === 'regular'
        ? 'Pretendard-Regular'
        : 'Pretendard-Medium',
    fontSize: font === 'bold' ? 16 : font === 'regular' ? 14 : 12,
    color: disabled ? '#CCCCCC' : '#000000',
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1.0}
        disabled={disabled}
        onPress={onPress}
        style={buttonStyle}
      >
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#CCCCCC',
  },
  disabledButtonContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CCCCCC',
    borderWidth: 2,
  },

  // 온보딩
  onboardingButtonContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 7,
    elevation: 5,
  },

  // 코드 복사하기
  copyButtonContainer: {
    width: 280,
    height: 44,
  },
});
