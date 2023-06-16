import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import Heart from '../../assets/images/main/heart.svg';

const Profile = () => {
  return (
    <>
      <View style={styles.coupleView}>
        <ImageBackground
          source={require('../../assets/images/main/boy.png')}
          style={{ width: 50, height: 50 }}
        />
        <Heart />
        <ImageBackground
          source={require('../../assets/images/main/girl.png')}
          style={{ width: 50, height: 50 }}
        />
      </View>
      <View style={styles.dayView}>
        <Text style={styles.weText}>우리가 만난지</Text>
        <Text style={styles.dayText}>128일 째</Text>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  coupleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 55,
    gap: 5,
  },
  dayView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  weText: {
    fontFamily: 'Pretendard-Regular',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  dayText: {
    fontSize: 20,
    fontFamily: 'Pretendard-Medium',
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
