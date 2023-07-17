import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { userState } from '../../state/atoms/userAtom';
import Heart from '../../assets/images/main/heart.svg';
import { ProfileComponentProps } from '../../types/main/mainPageTypes';
import { partnerState } from '../../state/atoms/partnerAtom';

const Profile = ({ meetDate }: ProfileComponentProps) => {
  const userInfo = useRecoilValue(userState);
  const partnerInfo = useRecoilValue(partnerState);

  // 커플 만날 날짜 계산
  const today = new Date();
  const firstDate = meetDate;

  const getDayDifference = (firstDate: string, secondDate: string): number => {
    const date1 = new Date(firstDate);
    const date2 = new Date(secondDate);
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(
      Math.abs((date1.getTime() - date2.getTime()) / oneDay)
    );
    return diffDays;
  };

  const daysDifference = getDayDifference(today.toISOString(), firstDate);

  return (
    <>
      <View style={styles.coupleView}>
        <View style={styles.profileView}>
          <Text style={styles.nameText}>{userInfo.name}</Text>
          <Heart />
          <Text style={styles.nameText}>{partnerInfo.name}</Text>
        </View>
        <Text style={styles.dayText}>+{daysDifference}</Text>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  coupleView: {
    alignItems: 'flex-start',
    marginTop: 80,
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dayText: {
    fontSize: 74,
    fontFamily: 'Pretendard-Bold',
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: -5,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Pretendard-Medium',
    color: '#FFFFFF',
  },
});
