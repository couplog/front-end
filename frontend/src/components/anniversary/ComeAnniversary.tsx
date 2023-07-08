import { ScrollView, Text, View } from 'react-native';
import React from 'react';
import { differenceInDays, format } from 'date-fns';
import { anniversaryGlobalStyles } from './OurAnniversary';
import { AnniversaryComponentProps } from '../../types/main/mainPageTypes';

const ComeAnniversary = ({
  comeAnniversaries,
}: {
  comeAnniversaries: AnniversaryComponentProps[];
}) => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F8F8F8', marginTop: 15 }}>
      {comeAnniversaries.map((anniversary) => {
        const targetDate = new Date(anniversary.date);
        const currentDate = new Date();
        const dayDiff = differenceInDays(targetDate, currentDate);
        const dDay = dayDiff >= 0 ? `D-${dayDiff}` : `D+${Math.abs(dayDiff)}`;

        return (
          <View key={anniversary.id} style={anniversaryGlobalStyles.dayView}>
            <Text style={anniversaryGlobalStyles.dayInfoText}>
              {anniversary.title}
            </Text>
            <View style={anniversaryGlobalStyles.textFlex}>
              <Text style={anniversaryGlobalStyles.dateText}>
                {format(targetDate, 'yy. MM. dd')}
              </Text>
              <Text style={anniversaryGlobalStyles.dDayText}>{dDay}</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ComeAnniversary;
