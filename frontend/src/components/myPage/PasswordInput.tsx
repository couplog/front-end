import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import OffEye from '../../assets/images/register/off_eye.svg';
import OnEye from '../../assets/images/register/on_eye.svg';
import { PasswordInputProps } from '../../types/myPage/types';

const PasswordInput = ({
  placeholder,
  placeholderTextColor,
  eyeClick,
  secureTextEntry,
  onChangeText,
  value,
  onChange,
  handleEyeToggle,
  style,
  label,
}: PasswordInputProps) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View>
        <TextInput
          style={style}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          onChange={onChange}
          value={value}
          autoCapitalize="none"
        />
        <TouchableOpacity
          activeOpacity={1.0}
          onPress={handleEyeToggle}
          style={styles.eyeIconView}
        >
          {eyeClick ? <OnEye /> : <OffEye />}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  label: {
    color: '#000000',
    fontFamily: 'Pretendard-Regular',
    marginTop: 35,
    marginBottom: 5,
  },
  eyeIconView: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
});
