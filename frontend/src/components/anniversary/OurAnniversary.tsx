import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  GestureHandlerRootView,
  Swipeable,
} from 'react-native-gesture-handler';
import { format } from 'date-fns';
import { coupleState } from '../../state/atoms/coupleAtom';
import { OurAnniversaryComponentProps } from '../../types/main/mainPageTypes';
import { handleAnniversaryDelete } from '../../api/anniversary/anniversaryDelete';
import SwipeButton from '../common/SwipeButton';
import { Props } from '../../screens/Anniversary/AnniversaryMainScreen';
import { editAnniversaryState } from '../../state/atoms/editAnniversary';

export interface OurAnniversaryProps {
  ourAnniversaries: OurAnniversaryComponentProps[];
  reloadAnniversaries: () => void;
}

const OurAnniversary = ({
  ourAnniversaries,
  reloadAnniversaries,
}: OurAnniversaryProps) => {
  const userInfo = useRecoilValue(coupleState);
  const setEditState = useSetRecoilState(editAnniversaryState);
  const navigation = useNavigation<Props['navigation']>();

  const [showStates, setShowStates] = useState(
    ourAnniversaries.map(() => false)
  );
  const [swipeStates, setSwipeStates] = useState(
    ourAnniversaries.map(() => false)
  );

  // 클릭 시 toggle 기능 구현
  const handlePress = (index: number) => {
    setShowStates((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  // swipe 상태 변경
  const handleSwipe = (index: number, isOpen: boolean) => {
    setSwipeStates((prevState) => {
      const newState = [...prevState];
      newState[index] = isOpen;
      return newState;
    });
  };

  const handleEdit = (
    id: number,
    content: string | null,
    date: string,
    title: string
  ) => {
    setEditState({ id, content, title, date });
    navigation.navigate('AnniversaryCreateScreen');
  };

  const handleDelete = async (id: number) => {
    await handleAnniversaryDelete(userInfo.coupleId, id);
    reloadAnniversaries();
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={anniversaryGlobalStyles.scrollContainer}
    >
      {ourAnniversaries.map((anniversary, index) => {
        const show = showStates[index];
        const category = anniversary.category;
        const dayScrollStyle = [
          anniversaryGlobalStyles.dayScrollView,
          {
            borderTopRightRadius: swipeStates[index] ? 0 : 8, // swipe 상태에 따라 조건부 스타일 적용
            borderBottomRightRadius: swipeStates[index] ? 0 : 8, // swipe 상태에 따라 조건부 스타일 적용
          },
        ];

        return category === 'OTHER' ? (
          <GestureHandlerRootView key={anniversary.id}>
            <Swipeable
              renderRightActions={() => (
                <SwipeButton
                  onEdit={() =>
                    handleEdit(
                      anniversary.id,
                      anniversary.content,
                      anniversary.date,
                      anniversary.title
                    )
                  }
                  onDelete={() => handleDelete(anniversary.id)}
                />
              )}
              overshootRight={false}
              onSwipeableWillOpen={() => handleSwipe(index, true)}
              onSwipeableWillClose={() => handleSwipe(index, false)}
            >
              <TouchableWithoutFeedback onPress={() => handlePress(index)}>
                <View style={dayScrollStyle}>
                  <View style={anniversaryGlobalStyles.flex}>
                    <Text style={anniversaryGlobalStyles.dayInfoText}>
                      {anniversary.title}
                    </Text>
                    <Text style={anniversaryGlobalStyles.dateText}>
                      {format(new Date(anniversary.date), 'yy. MM. dd')}
                    </Text>
                  </View>

                  {/* 내용 / 반복여부  */}
                  {show && (
                    <View style={anniversaryGlobalStyles.detailView}>
                      <Text style={anniversaryGlobalStyles.dayInfoText}>
                        {anniversary.content === ''
                          ? '내용 없음'
                          : anniversary.content}
                      </Text>
                      <Text
                        style={[
                          anniversaryGlobalStyles.dateText,
                          { bottom: 35 },
                        ]}
                      >
                        {anniversary.repeatRule === 'YEAR'
                          ? '매년 반복'
                          : '반복 없음'}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableWithoutFeedback>
            </Swipeable>
          </GestureHandlerRootView>
        ) : (
          // 수정/삭제 불가능한 기념일
          <View key={anniversary.id} style={anniversaryGlobalStyles.otherView}>
            <Text style={anniversaryGlobalStyles.dayInfoText}>
              {anniversary.title}
            </Text>
            <Text style={anniversaryGlobalStyles.dateText}>
              {format(new Date(anniversary.date), 'yy. MM. dd')}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default OurAnniversary;

export const anniversaryGlobalStyles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    marginTop: 15,
  },
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
  dayScrollView: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginTop: 13,
    borderRadius: 8,
    padding: 15,
  },
  otherView: {
    width: '100%',
    backgroundColor: 'transparent',
    padding: 13,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  detailView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 35,
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
  flex: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
