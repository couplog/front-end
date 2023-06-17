import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { userState } from '../../state/atoms/userAtom';
import Heart from '../../assets/images/main/heart.svg';
import { ProfileComponentProps } from '../../types/main/profileType';

const Profile = ({ meetDate, partnerImageUrl }: ProfileComponentProps) => {
  const userInfo = useRecoilValue(userState);
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
        <View style={styles.dayView}>
          <Text style={styles.weText}>우리가 만난지</Text>
          <Text style={styles.dayText}>{daysDifference}일 째</Text>
        </View>
        <View style={styles.profileView}>
          {/* 본인 */}
          {userInfo.profileImageUrl !== '' && (
            <Image
              source={{ uri: userInfo.profileImageUrl }}
              style={{ width: 50, height: 50 }}
            />
          )}
          <Heart />
          {/* 상대방  */}
          {partnerImageUrl !== '' && (
            <Image
              source={{ uri: partnerImageUrl }}
              style={{ width: 50, height: 50 }}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  coupleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
    marginBottom: 20,
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dayView: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
  },
  weText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  dayText: {
    fontSize: 24,
    fontFamily: 'Pretendard-Medium',
    fontWeight: '700',
    color: '#000000',
  },
});
