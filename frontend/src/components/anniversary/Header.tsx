import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Plus from '../../assets/images/common/boldPlus.svg';
import Back from '../../assets/images/common/smallBack.svg';

const Header = ({ onPress }: { onPress: () => void }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        hitSlop={styles.hitSlop}
        onPress={() => navigation.goBack()}
      >
        <Back />
      </TouchableOpacity>
      <TouchableOpacity hitSlop={styles.hitSlop} onPress={onPress}>
        <Plus onPress={onPress} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 25,
    marginBottom: -50,
  },
  hitSlop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
});
