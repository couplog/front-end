import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { useSetRecoilState } from 'recoil';
import { StackParamList } from '../../types/routes/navigationType';
import { planState } from '../../state/atoms/userPlanDetail';
import Header from '../../components/plan/detail/Header';
import Footer from '../../components/plan/detail/Footer';

type Props = StackScreenProps<StackParamList, 'PlanTitleScreen'>;

const PlanTitle = ({ navigation }: Props) => {
  const setPlanAtom = useSetRecoilState(planState);
  const [title, setTitle] = useState('');

  const handleTitleComplete = () => {
    setPlanAtom((prevPlan) => ({
      ...prevPlan,
      title,
    }));

    navigation.navigate('PlanStartScreen');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <Header
            text="다음"
            none
            onPress={handleTitleComplete}
            disabled={!title || title.length === 0}
          />

          <View style={styles.inputView}>
            <TextInput
              placeholder="일정 제목을 입력하세요."
              maxLength={15}
              value={title}
              onChangeText={(text) => setTitle(text)}
              placeholderTextColor="#909090"
              style={styles.titleText}
            />
          </View>
          {title.length === 0 ? (
            <Text style={styles.infoText}>(1-15자)</Text>
          ) : null}
        </SafeAreaView>

        <Footer />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PlanTitle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 25,
    marginRight: 25,
  },
  inputView: {
    marginTop: 70,
    fontSize: 24,
    fontFamily: 'Pretendard-Medium',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    fontFamily: 'Pretendard-Medium',
    color: '#000000',
  },
  infoText: {
    fontSize: 20,
    color: '#909090',
    fontFamily: 'Pretendard-Medium',
    textAlign: 'center',
    marginTop: 15,
  },
});
