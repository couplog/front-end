import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DayInfo } from './DayInfo';
import Calendar from '../../assets/images/main/calendar.svg';
import Image from '../../assets/images/main/image.svg';

const Footer = () => {
  return (
    <View style={styles.footerView}>
      <View style={styles.dDayBox}>
        <Text style={styles.headText}>다가오는 기념일</Text>
        <View>
          {/* 기념일 API 구현되면 적용 */}
          <DayInfo days="900일" date="2023.08.17" />
          <DayInfo days="1000일" date="2023.11.25" />
          <DayInfo days="3주년" date="2024.03.01" />
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {/* 추후 일정 페이지 연결 */}
        <Calendar />
        {/* 추후 사진 페이지 연결 */}
        <Image />
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footerView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
    marginLeft: 25,
    marginRight: 25,
  },
  dDayBox: {
    width: 225,
    height: 135,
    padding: 15,
    backgroundColor: '#0000004D',
    borderColor: '#545454',
    borderWidth: 0.5,
    borderRadius: 8,
    marginBottom: 25,
  },
  headText: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 3,
  },
});
