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
import backgroundImage from '../assets/images/main/backgroundMain.png';

type Props = StackScreenProps<StackParamList, 'MainScreen'>;

const Main = ({ navigation }: Props) => {
  const [coupleInfo, setCoupleInfo] = useRecoilState(coupleState);
  const setPartnerInfo = useSetRecoilState(partnerState);
  const [anniversaries, setAnniversaries] = useState<
    AnniversaryComponentProps[]
  >([]);

  // 커플 정보 불러오기
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

  // 메인화면 접근 -> 커플 정보 조회, 상대방 유저 정보 조회 -> 상태관리 저장(atom)
  // + 다가올 기념일 3개 조회
  useEffect(() => {
    fetchCoupleInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ImageBackground
      source={backgroundImage}
      style={{ width: '100%', height: '100%', zIndex: 100 }}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.margin}>
          {/* Header UI */}
          <Header />

          {/* 날씨 & 연애 day UI */}
          <Profile meetDate={coupleInfo.firstDate} />

          {/* 날씨는 다음 version 업데이트 */}
        </View>

        {/* Footer UI */}
        {/* 클릭시 기념일 페이지 navigation */}
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
});
