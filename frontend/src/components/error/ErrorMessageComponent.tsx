import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface Errors {
  errors: string | undefined;
}

export const LoginError = ({ errors }: Errors) => {
  switch (errors) {
    case 'required':
      return <Text style={styles.errorText}>필수 항목입니다.</Text>;
    case 'phone':
      return <Text style={styles.errorText}>존재하지 않는 번호입니다.</Text>;
    case 'password':
      return <Text style={styles.errorText}>비밀번호가 틀렸습니다.</Text>;
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  errorText: {
    color: '#E53C3C',
    marginTop: 2,
  },
});
