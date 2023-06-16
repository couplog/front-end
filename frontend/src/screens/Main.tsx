import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { BlurView } from '@react-native-community/blur';
import Bell from '../assets/images/main/alert.svg';
import Set from '../assets/images/main/setting.svg';
import Heart from '../assets/images/main/heart.svg';
import Calendar from '../assets/images/main/calendar.svg';

const Main = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* 임시 배경화면 */}
      <ImageBackground
        source={require('../assets/images/main/background.png')}
        style={{ width: '100%', height: '100%' }}
      >
        <SafeAreaView style={styles.container}>
          <View style={{ marginLeft: 25, marginRight: 25 }}>
            {/* Header UI */}
            <View style={styles.headerView}>
              <View style={styles.logoBox}>
                <Text style={styles.logoText}>로고</Text>
              </View>
              <View style={styles.iconFlex}>
                <Bell />
                <Set />
              </View>
            </View>

            {/* 유저 프로필 & 연애 day UI */}
            {/* 임시 구현(이미지) */}
            <View style={styles.coupleView}>
              <ImageBackground
                source={require('../assets/images/main/boy.png')}
                style={{ width: 50, height: 50 }}
              />
              <Heart />
              <ImageBackground
                source={require('../assets/images/main/girl.png')}
                style={{ width: 50, height: 50 }}
              />
            </View>
            <View style={styles.dayView}>
              <Text style={styles.weText}>우리가 만난지</Text>
              <Text style={styles.dayText}>128일 째</Text>
            </View>
          </View>

          {/* Footer UI */}
          <View style={styles.footerView}>
            <View style={styles.dDayBox}>
              <BlurView
                blurType="light"
                style={styles.absolute}
                blurAmount={5}
                reducedTransparencyFallbackColor="white"
              />
              <View style={styles.itemFlex}>
                {/* 임시 사각 박스 */}
                <View
                  style={{ width: 60, height: 60, backgroundColor: '#C8C8C8' }}
                />
                <View>
                  <Text style={styles.weText}>다음 (기념일)까지</Text>
                  <Text style={styles.dayText}>83일 남았어요</Text>
                </View>
              </View>
              <Calendar style={styles.iconCalendar} />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  iconFlex: {
    flexDirection: 'row',
    gap: 15,
  },
  logoBox: {
    width: 100,
    height: 32,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  footerView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 120,
  },
  dDayBox: {
    width: 330,
    height: 85,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#D8D8D8',
    borderWidth: 1,
    borderRadius: 14,
  },
  itemFlex: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    gap: 10,
  },
  logoText: {
    color: '#FFFFFF',
    fontFamily: 'Pretendard-Regular',
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
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 14,
  },
  iconCalendar: { marginBottom: 35, marginRight: 10 },
});
