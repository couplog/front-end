import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { format } from 'date-fns';
import { OurAnniversaryComponentProps } from '../../types/main/mainPageTypes';

const OurAnniversary = ({
  ourAnniversaries,
}: {
  ourAnniversaries: OurAnniversaryComponentProps[];
}) => {
  // 클릭하면 내용 & 반복 보이는거 구현 예정, 스와이프 메인 캘린더 페이지 컴포넌트 병합 예정
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F8F8F8', marginTop: 15 }}>
      {ourAnniversaries.map((anniversary) => {
        return (
          <View key={anniversary.id} style={anniversaryGlobalStyles.dayView}>
            <Text style={anniversaryGlobalStyles.dayInfoText}>
              {anniversary.title}
            </Text>
            <View style={anniversaryGlobalStyles.textFlex}>
              <Text style={anniversaryGlobalStyles.dateText}>
                {format(new Date(anniversary.date), 'yy. MM. dd')}
              </Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default OurAnniversary;

export const anniversaryGlobalStyles = StyleSheet.create({
  dayView: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginTop: 13,
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayInfoText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Pretendard-Regular',
  },
  dateText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Pretendard-Regular',
    color: '#909090',
  },
  dDayText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Pretendard-Regular',
    color: '#000000',
  },
  textFlex: {
    flexDirection: 'row',
    gap: 15,
  },
});
