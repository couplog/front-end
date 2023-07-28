import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { userState } from '../../state/atoms/userAtom';
import Heart from '../../assets/images/main/heart.svg';
import BlackHeart from '../../assets/images/main/heartBlack.svg';
import { ProfileComponentProps } from '../../types/main/mainPageTypes';
import { partnerState } from '../../state/atoms/partnerAtom';

const Profile = ({ meetDate, anniversary }: ProfileComponentProps) => {
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

  // 페이지별 스타일 분기처리
  const textStyle = {
    ...styles.nameText,
    color: anniversary ? '#000000' : '#FFFFFF',
    fontWeight: anniversary ? '500' : ('700' as '500' | '700'),
  };

  const dayTextStyle = {
    ...styles.dayText,
    color: anniversary ? '#000000' : '#FFFFFF',
    fontWeight: anniversary ? '500' : ('900' as '500' | '900'),
  };

  return (
    <>
      <View style={styles.coupleView}>
        <View style={styles.profileView}>
          <Text style={textStyle}>{userInfo.name}</Text>
          {anniversary ? <BlackHeart /> : <Heart />}
          <Text style={textStyle}>{partnerInfo.name}</Text>
        </View>
        <Text style={dayTextStyle}>
          {anniversary ? `D+${daysDifference}` : `+${daysDifference}`}
        </Text>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  coupleView: {
    alignItems: 'flex-start',
    marginTop: 55,
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dayText: {
    fontSize: 74,
    fontFamily: 'Pretendard-Bold',
    marginTop: -5,
  },
  nameText: {
    fontSize: 18,
    fontFamily: 'Pretendard-Medium',
  },
});
