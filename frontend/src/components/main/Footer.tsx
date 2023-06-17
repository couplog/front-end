import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Calendar from '../../assets/images/main/calendar.svg';

const Footer = () => {
  return (
    <View style={styles.footerView}>
      <View style={styles.dDayBox}>
        <View style={styles.itemFlex}>
          {/* 임시 사각 박스 */}
          <View style={{ width: 60, height: 60, backgroundColor: '#C8C8C8' }} />
          <View style={{ gap: 3 }}>
            <Text style={styles.weText}>다음 (기념일)까지</Text>
            <Text style={styles.dayText}>83일 남았어요</Text>
          </View>
        </View>
        <Calendar style={styles.iconCalendar} />
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
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
  iconCalendar: { marginBottom: 35, marginRight: 10 },
  weText: {
    fontFamily: 'Pretendard-Regular',
    fontWeight: '600',
    color: '#000000',
  },
  dayText: {
    fontSize: 20,
    fontFamily: 'Pretendard-Medium',
    fontWeight: '700',
    color: '#000000',
  },
});
