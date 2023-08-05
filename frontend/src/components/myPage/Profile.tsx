import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { formatPhoneNumber } from '../../utils/formattedPhone';
import { ProfileProps } from '../../types/myPage/types';

const Profile = ({ myName, partnerName, birth, phone }: ProfileProps) => {
  return (
    <View style={myStyles.profileContainer}>
      <View style={myStyles.flex}>
        <Text style={myStyles.title}>{myName}</Text>
        <Text style={myStyles.label}>♥ {partnerName}</Text>
      </View>
      <Text style={[myStyles.label, { marginTop: 15 }]}>{birth}</Text>
      <Text style={[myStyles.label, { marginTop: 8, marginBottom: 3 }]}>
        {formatPhoneNumber(phone)}
      </Text>
    </View>
  );
};

export default Profile;

export const myStyles = StyleSheet.create({
  profileContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 13,
    marginTop: 35,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Pretendard-Medium',
    color: '#000000',
  },
  label: {
    fontFamily: 'Pretendard-Regular',
    color: '#909090',
    fontSize: 14,
  },
  contentText: {
    fontSize: 14,
  },
  userText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: '#FC887B',
  },
});
