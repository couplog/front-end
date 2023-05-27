import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

interface ButtonProps {
  text: string;
  disabled: boolean;
  onPress: () => void;
}

const ButtonComponent = ({ disabled, text, onPress }: ButtonProps) => {
  const buttonStyle = {
    ...styles.buttonContainer,
    ...(disabled ? styles.disabledButtonContainer : {}),
    ...(text === '시작하기' ? styles.onboardingButtonContainer : {}),
  };

  const textStyle = disabled ? styles.disabledText : styles.text;

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={1.0} disabled={disabled} onPress={onPress} style={buttonStyle}>
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  // 버튼 분기처리
  buttonContainer: {
    width: 327,
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
  // 텍스트 분기처리
  text: {
    color: '#000000',
  },
  disabledText: {
    color: '#CCCCCC',
  },

  // 온보딩
  onboardingButtonContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 7,
    elevation: 5,
  },
});
