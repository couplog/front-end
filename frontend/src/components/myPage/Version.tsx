import { StyleSheet, Text } from 'react-native';
import React from 'react';

const Version = () => {
  return <Text style={styles.version}>Ver. 1.0.0</Text>;
};

export default Version;

const styles = StyleSheet.create({
  version: {
    textAlign: 'center',
    color: '#909090',
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    marginBottom: 40,
  },
});
