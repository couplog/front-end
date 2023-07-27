import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import { coupleDisconnect } from '../../api/myPage/disconnect';
import { userWithdraw } from '../../api/myPage/withdraw';
import { MyPageModalProps } from '../../types/myPage/types';

const MyPageModal = ({
  showModal,
  setShowModal,
  type,
  navigation,
  memberId,
}: MyPageModalProps) => {
  const withdraw = type === '탈퇴';

  // 연결끊기 로직
  const handleDisconnect = async () => {
    try {
      const res = await coupleDisconnect(memberId);

      console.log(res.data);
      setShowModal(false);
      navigation.navigate('OnboardingScreen');
    } catch (err) {
      console.log(err);
    }
  };

  // 탈퇴 로직
  const handleWithdraw = async () => {
    try {
      const res = await userWithdraw(memberId);

      console.log(res.data);
      setShowModal(false);
      navigation.navigate('OnboardingScreen');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* Modal */}
      <Modal animationType="fade" transparent visible={showModal}>
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                {/* Title */}
                <Text style={styles.title}>
                  {withdraw ? '회원 탈퇴' : '커플 연결 끊기'}
                </Text>
                <Text style={styles.modalText}>
                  {withdraw
                    ? '회원 탈퇴를 하면 상대방과의 연결이\n끊어지며 복구할 수 없습니다.'
                    : '상대방과의 연결을 끊으면 데이터가 모두\n삭제되며 복구할 수 없습니다.'}
                </Text>

                {/* button */}
                <TouchableOpacity
                  activeOpacity={1.0}
                  style={styles.button}
                  onPress={withdraw ? handleWithdraw : handleDisconnect}
                >
                  <Text style={styles.logoutText}>
                    {withdraw ? '회원 탈퇴' : '연결 끊기'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1.0}
                  style={styles.button}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.continueText}>취소</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default MyPageModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 10,
    width: 255,
    shadowOffset: {
      width: 5,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Pretendard-Medium',
    marginTop: 25,
  },
  modalText: {
    fontSize: 13,
    fontFamily: 'Pretendard-Regular',
    color: '#000000',
    marginTop: 5,
    marginBottom: 15,
    lineHeight: 18,
    textAlign: 'center',
  },
  button: {
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    borderTopColor: '#E6E6E6',
    borderTopWidth: 1,
  },
  logoutText: {
    color: '#FE3D2F',
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
  },
  continueText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Pretendard-Medium',
  },
});
