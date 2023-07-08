import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../types/routes/navigationType';
import Header from '../../components/anniversary/Header';
import TitleInput from '../../components/anniversary/TitleInput';
import ContentInput from '../../components/anniversary/ContentInput';
import Repeat from '../../components/anniversary/Repeat';
import DateInput from '../../components/anniversary/DateInput';
import { handleCreateAnniversary } from '../../api/anniversary/CreateAnniversary';
import { coupleState } from '../../state/atoms/coupleAtom';

type Props = StackScreenProps<StackParamList, 'AnniversaryCreateScreen'>;

const AnniversaryCreateScreen = ({ navigation }: Props) => {
  const coupleInfo = useRecoilValue(coupleState);
  const [title, setTitle] = useState('');
  const [daySelected, setDaySelected] = useState('');
  const [repeatStart, setRepeatStart] = useState('');
  const [repeatCode, setRepeatCode] = useState('NONE');
  const [startVisible, setStartVisible] = useState(false);
  const [content, setContent] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  // disabled 상태 업데이트
  useEffect(() => {
    if (title && daySelected && repeatCode) {
      setIsDisabled(false); // 필수값이 모두 입력되면 disabled 해제
    } else {
      setIsDisabled(true); // 필수값이 하나라도 빠지면 disabled 활성화
    }
  }, [title, daySelected, repeatCode]);

  // 기념일 추가히기
  const handleOnClick = async () => {
    try {
      const response = await handleCreateAnniversary(
        { date: daySelected, content, repeatRule: repeatCode, title },
        coupleInfo.coupleId
      );
      navigation.navigate('AnniversaryMainScreen');
      console.log(response.data);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => setStartVisible(false)}>
        <View style={styles.wrapper}>
          <Header isDisabled={isDisabled} create onPress={handleOnClick} />

          <TitleInput setTitle={setTitle} title={title} />

          <DateInput
            daySelected={daySelected}
            setDaySelected={setDaySelected}
          />

          <Repeat
            repeatStart={repeatStart}
            setRepeatStart={setRepeatStart}
            repeatCode={repeatCode}
            setRepeatCode={setRepeatCode}
            startVisible={startVisible}
            setStartVisible={setStartVisible}
          />

          <ContentInput content={content} setContent={setContent} />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default AnniversaryCreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  wrapper: {
    marginLeft: 20,
    marginRight: 20,
  },
});
