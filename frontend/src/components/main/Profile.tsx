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
        {/* 이 부분 디자이너 분들과 상의해보기 & 피그마 디자인처럼 구현 가능한지 리서치 */}
        <Text style={styles.dayText}>D+{daysDifference}</Text>
        <View style={styles.profileView}>
          {/* 본인 */}
          {userInfo.profileImageUrl !== '' && (
            <Image
              source={{ uri: userInfo.profileImageUrl }}
              style={{
                ...styles.profileImg,
                transform: [{ rotate: '-10deg' }],
              }}
            />
          )}
          <Heart />
          {/* 상대방  */}
          {partnerImageUrl !== '' && (
            <Image
              source={{ uri: partnerImageUrl }}
              style={{ ...styles.profileImg, transform: [{ rotate: '10deg' }] }}
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
    alignItems: 'center',
    marginTop: 30,
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 6,
  },
  weText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  dayText: {
    fontSize: 96,
    fontFamily: 'Pretendard-Medium',
    fontWeight: '700',
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
});
