import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { format } from 'date-fns';
import { DayInfo } from './DayInfo';
import { AnniversaryComponentProps } from '../../types/main/mainPageTypes';
import Right from '../../assets/images/common/rightAngle.svg';

const Footer = ({
  anniversaries,
}: {
  anniversaries: AnniversaryComponentProps[];
}) => {
  return (
    // 기념일 onPress => 기념일 페이지 navigation
    <View style={styles.footerView}>
      <View style={styles.textFlex}>
        <Text style={styles.headText}>다가오는 기념일</Text>
        <Right />
      </View>
      <View style={{ marginBottom: 35 }}>
        {anniversaries.map((anniversary, index) => {
          let backgroundColor;
          let opacity;

          // 최근가준 기념일 부터 색상, opacity 변경
          if (index === 0) {
            backgroundColor = 'rgba(237, 240, 243, 1)';
            opacity = 1;
          } else if (index === 1) {
            backgroundColor = 'rgba(237, 240, 243, 0.6)';
            opacity = 0.7;
          } else if (index === 2) {
            backgroundColor = 'rgba(237, 240, 243, 0.3)';
            opacity = 0.5;
          }
          return (
            <DayInfo
              key={anniversary.id}
              title={anniversary.title}
              date={format(new Date(anniversary.date), 'yyyy.MM.dd')}
              backgroundColor={backgroundColor}
              opacity={opacity}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footerView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 35,
    marginLeft: 25,
    marginRight: 25,
  },
  anniversaryBox: {
    width: 225,
    height: 135,
    padding: 15,
    backgroundColor: '#0000004D',
    borderColor: '#545454',
    borderWidth: 0.5,
    borderRadius: 8,
    marginBottom: 25,
  },
  textFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    marginBottom: 3,
  },
  headText: {
    fontSize: 18,
    fontFamily: 'Pretendard-Medium',
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
