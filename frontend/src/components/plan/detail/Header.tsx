import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Back from '../../../assets/images/register/back.svg';
import { PlanDetailProps } from '../../../types/plan/planDetailTypes';

const Header = ({ none, text, onPress, disabled }: PlanDetailProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.headerView,
          justifyContent: none ? 'flex-end' : 'space-between',
        }}
      >
        {none ? null : <Back onPress={() => navigation.goBack()} />}
        <TouchableOpacity
          activeOpacity={1.0}
          disabled={disabled}
          onPress={onPress}
        >
          <Text style={styles.headerText}>{text}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  headerView: {
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Pretendard-Bold',
    color: '#000000',
  },
});
