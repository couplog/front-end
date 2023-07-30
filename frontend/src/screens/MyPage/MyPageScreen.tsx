import { SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { useRecoilValue } from 'recoil';
import { userState } from '../../state/atoms/userAtom';
import { StackParamList } from '../../types/routes/navigationType';
import Header from '../../components/myPage/Header';
import Profile from '../../components/myPage/Profile';
import ContentBox from '../../components/myPage/ContentBox';
import MyPageModal from '../../components/myPage/MyPageModal';
import { partnerState } from '../../state/atoms/partnerAtom';

type Props = StackScreenProps<StackParamList, 'MyPageScreen'>;

const MyPageScreen = ({ navigation }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState('');

  const userInfo = useRecoilValue(userState);
  const partnerInfo = useRecoilValue(partnerState);

  // map data
  const contentData = [
    {
      top: 10,
      title: '비밀번호 변경',
      onPress: () => navigation.navigate('ChangePasswordScreen'),
    },
    {
      top: 50,
      title: '개인정보 처리 방침',
      onPress: () => console.log('개인'),
      // 링크 연결 해야함
    },
    { top: 10, title: '서비스 이용약관', onPress: () => console.log('서비스') }, // 링크 연결
    {
      top: 50,
      user: true,
      title: '커플 연결 끊기',
      onPress: () => handleShowModal('끊기'),
    },
    {
      top: 10,
      user: true,
      title: '회원 탈퇴',
      onPress: () => handleShowModal('탈퇴'),
    },
  ];

  // modal function
  const handleShowModal = (type: string) => {
    setType(type);
    setShowModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Header />

        <Profile
          myName={userInfo.name}
          partnerName={partnerInfo.name}
          birth={userInfo.birth}
          phone={userInfo.phone}
        />

        {contentData.map((data, index) => (
          <ContentBox key={index} {...data} />
        ))}

        <MyPageModal
          memberId={userInfo.memberId}
          type={type}
          showModal={showModal}
          setShowModal={setShowModal}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyPageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  wrapper: {
    marginLeft: 25,
    marginRight: 25,
  },
});