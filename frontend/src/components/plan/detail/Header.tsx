import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Back from '../../../assets/images/register/back.svg';

interface PlanDetailProps {
  disabled: boolean;
  onPress: () => void;
}

const Header = ({ onPress, disabled }: PlanDetailProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Back onPress={() => navigation.goBack()} />
        <TouchableOpacity
          activeOpacity={1.0}
          disabled={disabled}
          onPress={onPress}
        >
          <Text style={styles.headerText}>다음</Text>
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
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Pretendard-Bold',
    color: '#000000',
  },
});
