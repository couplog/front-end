import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../types/routes/navigationType';
import { handleCoupleInfo } from '../api/couple/coupleInfo';
import { coupleState } from '../state/atoms/coupleAtom';
import { handlePartnerInfo } from '../api/couple/partnerInfo';
import { partnerState } from '../state/atoms/partnerAtom';
import { handleAnniversaryComing } from '../api/anniversary/anniversaryCome';
import { AnniversaryComponentProps } from '../types/main/mainPageTypes';
import Header from '../components/main/Header';
import Profile from '../components/main/Profile';
import Footer from '../components/main/Footer';
import { handleMemberInfo } from '../api/login/login';
import { userState } from '../state/atoms/userAtom';
import backgroundImage from '../assets/images/main/backgroundMain.png';

type Props = StackScreenProps<StackParamList, 'MainScreen'>;

const Main = ({ navigation }: Props) => {
  const [coupleInfo, setCoupleInfo] = useRecoilState(coupleState);
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const setPartnerInfo = useSetRecoilState(partnerState);
  const [anniversaries, setAnniversaries] = useState<
    AnniversaryComponentProps[]
  >([]);

  // 커플 & 본인 정보 불러오기
  const fetchCoupleInfo = async () => {
    try {
      const coupleInfoResponse = await handleCoupleInfo();
      const { data } = coupleInfoResponse.data;

      const updatedCoupleInfo = {
        coupleId: data.coupleId,
        firstDate: data.firstDate,
        partnerId: data.partnerId,
      };

      setCoupleInfo((prevCoupleInfo) => ({
        ...prevCoupleInfo,
        ...updatedCoupleInfo,
      }));

      fetchAnniversaryComing(updatedCoupleInfo.coupleId, 3);

      // 해당 함수 실행과 동시에 본인 & 상대방 정보 불러오기 API 실행
      fetchUserInfo();
      fetchPartnerInfo();
    } catch (error) {
      console.log(error);
    }
  };

  // 상대방 정보 불러오기
  const fetchPartnerInfo = async () => {
    try {
      const response = await handlePartnerInfo();
      const {
        birthDay,
        gender,
        memberId,
        name,
        nickname,
        phone,
        profileImageUrl,
      } = response.data.data;

      setPartnerInfo({
        birth: birthDay,
        gender,
        memberId,
        name,
        nickname,
        phone,
        profileImageUrl,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 다가올 기념일 3개 불러오기
  const fetchAnniversaryComing = async (
    coupleId: number | null,
    size: number
  ) => {
    try {
      const res = await handleAnniversaryComing(coupleId, size);
      const anniversariesData = res.data.data.anniversaries;
      setAnniversaries(anniversariesData);
    } catch (error) {
      console.log(error);
    }
  };

  // 본인 정보 불러오기
  const fetchUserInfo = async () => {
    const memberRes = await handleMemberInfo();
    const memberInfo = memberRes?.data.data;
    const updateUserInfo = {
      ...userInfo,
      memberId: memberInfo.memberId,
      name: memberInfo.name,
      nickname: memberInfo.nickname,
      phone: memberInfo.phone,
      birth: memberInfo.birth,
      gender: memberInfo.gender,
      profileImageUrl: memberInfo.profileImageURL,
    };
    setUserInfo(updateUserInfo);
  };

  // 메인화면 접근 -> 커플 정보 조회, 상대방 유저 정보 조회, 본인 정보 조회 -> 상태관리 저장(atom)
  // + 다가올 기념일 3개 조회
  useEffect(() => {
    fetchCoupleInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.image}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.margin}>
          {/* Header UI */}
          <Header onPress={() => navigation.navigate('MyPageRoute')} />

          {/* Day UI */}
          <Profile meetDate={coupleInfo.firstDate} />
        </View>

        {/* Footer UI */}
        <Footer navigation={navigation} anniversaries={anniversaries} />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  margin: {
    marginLeft: 25,
    marginRight: 25,
  },
  image: {
    width: '100%',
    height: '100%',
    zIndex: 100,
  },
});
