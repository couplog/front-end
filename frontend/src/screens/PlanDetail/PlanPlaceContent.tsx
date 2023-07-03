import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../types/routes/navigationType';
import { planState } from '../../state/atoms/userPlanDetail';
import Footer from '../../components/plan/detail/Footer';
import Header from '../../components/plan/detail/Header';

type Props = StackScreenProps<StackParamList, 'PlanEndScreen'>;

const PlanPlaceContent = ({ navigation }: Props) => {
  const setPlanAtom = useSetRecoilState(planState);
  const [place, setPlace] = useState('');
  const [content, setContent] = useState('');

  const reset = useResetRecoilState(planState);

  const handlePlaceContent = () => {
    setPlanAtom((prevPlan) => ({
      ...prevPlan,
      location: place,
      content,
    }));

    navigation.navigate('PlanRepeatScreen');
  };

  // 일정 취소
  const handelCancel = () => {
    reset();
    setPlace('');
    setContent('');

    navigation.navigate('PlanCalendarScreen');
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Header text="다음" disabled={false} onPress={handlePlaceContent} />

        {/* 위치 입력 */}
        <View style={styles.inputView}>
          <Text style={styles.inputText}>위치</Text>
          <TextInput
            style={styles.placeInputBox}
            placeholder="위치"
            placeholderTextColor="#909090"
            value={place}
            onChangeText={(text) => setPlace(text)}
            maxLength={10}
          />
        </View>

        {/* 내용 입력 */}
        <View style={{ marginTop: 50 }}>
          <Text style={styles.inputText}>내용</Text>
          <TextInput
            style={styles.contentInputBox}
            placeholder="일정 내용을 입력하세요. (0-100자)"
            placeholderTextColor="#909090"
            value={content}
            onChangeText={(text) => setContent(text)}
            maxLength={100}
            multiline
          />
        </View>
      </SafeAreaView>
      <Footer onPress={handelCancel} />
    </View>
  );
};

export default PlanPlaceContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 25,
    marginRight: 25,
  },
  inputView: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: '#000000',
  },
  placeInputBox: {
    width: 155,
    height: 32,
    backgroundColor: '#EDF0F3',
    borderRadius: 8,
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'Pretendard-Regular',
  },
  contentInputBox: {
    width: '100%',
    height: 150,
    marginTop: 20,
    borderRadius: 8,
    padding: 10,
    paddingTop: 10,
    color: '#000000',
    backgroundColor: '#EDF0F3',
    fontFamily: 'Pretendard-Regular',
  },
});
