import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { handleCoupleInfo } from '../api/couple/coupleInfo';
import { coupleState } from '../state/atoms/coupleAtom';
import Header from '../components/main/Header';
import Profile from '../components/main/Profile';
import Footer from '../components/main/Footer';
import { handlePartnerProfile } from '../api/couple/partnerProfile';
import Weather from '../components/main/Weather';

// - 커플 배경 사진 등록 / 수정 / 삭제 / 조회
// - 각자 프로필 사진 조회
// - 만난지 몇일 되었는지 조회
// - 다음 기념일 조회 - 이건 기념일 페이지 완성되면(기능 구현 완료되면 진행)

const Main = () => {
  const [coupleInfo, setCoupleInfo] = useRecoilState(coupleState);

  // 메인화면 접근 -> 커플 정보 조회, 상대방 프로필 조회
  useEffect(() => {
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

        fetchPartnerProfile(updatedCoupleInfo.partnerId);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPartnerProfile = async (partnerId: number) => {
      try {
        const partnerProfileResponse = await handlePartnerProfile(partnerId);
        const partnerImage = partnerProfileResponse.data.data.profileImageURL;

        setCoupleInfo((prevCoupleInfo) => ({
          ...prevCoupleInfo,
          partnerImageUrl: partnerImage,
        }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchCoupleInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // 임시 배경화면 (추후 API로 가져와야함)
    <ImageBackground
      source={require('../assets/images/main/background.png')}
      style={{ width: '100%', height: '100%' }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.margin}>
          {/* Header UI */}
          <Header />
          <Weather />

          {/* 유저 프로필 & 연애 day UI */}
          {/* 임시 구현(이미지) */}
          <Profile
            meetDate={coupleInfo.firstDate}
            partnerImageUrl={coupleInfo.partnerImageUrl}
          />
        </View>

        {/* Footer UI */}
        <Footer />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  margin: {
    marginLeft: 25,
    marginRight: 25,
  },
});
