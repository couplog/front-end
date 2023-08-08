import {
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../types/routes/navigationType';
import { planState } from '../../state/atoms/userPlanDetail';
import Footer from '../../components/plan/detail/Footer';
import Header from '../../components/plan/detail/Header';
import { editModeState } from '../../state/atoms/createEditModeAtom';
import { userState } from '../../state/atoms/userAtom';
import { editDate, editPlan } from '../../api/plan/editPlan';
import { coupleState } from '../../state/atoms/coupleAtom';
import RepeatModal from '../../components/plan/detail/RepeatModal';

type Props = StackScreenProps<StackParamList, 'PlanPlaceContentScreen'>;

const PlanPlaceContent = ({ navigation }: Props) => {
  const [planAtom, setPlanAtom] = useRecoilState(planState);
  const createEditMode = useRecoilValue(editModeState);
  const userInfo = useRecoilValue(userState);
  const coupleInfo = useRecoilValue(coupleState);
  const [place, setPlace] = useState('');
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false);

  const reset = useResetRecoilState(planState);
  const editReset = useResetRecoilState(editModeState);

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
    createEditMode.mode ? editReset() : reset();
    setPlace('');
    setContent('');

    navigation.navigate('PlanCalendarScreen');
  };

  // 수정 모드일시
  useEffect(() => {
    if (createEditMode.mode) {
      // 위치
      setPlace(createEditMode.detail.location);
      // 내용
      setContent(createEditMode.detail.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createEditMode.mode]);

  // 수정 분기처리
  const handleEditPlan = () => {
    if (createEditMode.mode === 'mine') {
      if (createEditMode.detail.repeatRule !== 'N') {
        setShowModal(true);
      } else {
        handleEditMyPlanOrDate('myPlan', createEditMode.detail.scheduleId);
      }
    } else {
      handleEditMyPlanOrDate('date', createEditMode.detail.datingId);
    }
  };

  // 데이트 일정, 나의 일정 수정 타입에 따른 기능
  const handleEditMyPlanOrDate = async (
    type: 'myPlan' | 'date',
    id: number | null | undefined,
    repeat: boolean = false // 기본값을 false로 설정
  ) => {
    const planData = {
      ...planAtom,
      location: place,
      content,
    };

    try {
      let res;
      if (type === 'myPlan') {
        res = await editPlan(planData, userInfo.memberId, id, repeat);
      } else {
        res = await editDate(planData, coupleInfo.coupleId, id);
      }
      editReset();

      console.log(type === 'myPlan' ? '개인: ' : '데이트: ', res.data.success);
      navigation.navigate('PlanCalendarScreen');
    } catch (err: any) {
      console.log(err.response.data.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <Header
            text={createEditMode.mode ? '수정' : '다음'}
            disabled={false}
            onPress={createEditMode.mode ? handleEditPlan : handlePlaceContent}
          />

          {/* 위치 입력 */}
          <View style={styles.inputView}>
            <Text style={styles.inputText}>위치</Text>
            <TextInput
              style={styles.placeInputBox}
              placeholder="위치"
              placeholderTextColor="#909090"
              value={place}
              onChangeText={(text) => setPlace(text)}
              maxLength={15}
            />
          </View>

          {/* 내용 입력 */}
          <View style={{ marginTop: 50 }}>
            <Text style={styles.inputText}>내용</Text>
            <TextInput
              style={styles.contentInputBox}
              placeholder="일정 내용을 입력하세요. (0-80자)"
              placeholderTextColor="#909090"
              value={content}
              onChangeText={(text) => setContent(text)}
              maxLength={80}
              multiline
            />
          </View>

          <RepeatModal
            onPress={() =>
              handleEditMyPlanOrDate('myPlan', createEditMode.detail.scheduleId)
            }
            onPressRepeat={() =>
              handleEditMyPlanOrDate(
                'myPlan',
                createEditMode.detail.scheduleId,
                true
              )
            }
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </SafeAreaView>
        <Footer onPress={handelCancel} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PlanPlaceContent;

const height = Platform.OS === 'ios' ? 32 : 38;

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
    height: height,
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
