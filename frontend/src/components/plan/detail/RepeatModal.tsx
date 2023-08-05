import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import { PlanModalProps } from '../../../types/myPage/types';

const RepeatModal = ({
  showModal,
  setShowModal,
  onPress,
  onPressRepeat,
}: PlanModalProps) => {
  const handleSetEdit = async (repeat: boolean) => {
    if (repeat) {
      onPressRepeat();
    } else {
      onPress();
    }
    setShowModal(false);
  };

  return (
    <>
      {/* Modal */}
      <Modal animationType="fade" transparent visible={showModal}>
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.title}>일정 수정</Text>
                <Text style={styles.modalText}>
                  반복 일정을 모두 수정할까요?
                </Text>

                <TouchableOpacity
                  activeOpacity={1.0}
                  style={styles.button}
                  onPress={() => handleSetEdit(true)}
                >
                  <Text style={styles.logoutText}>반복 일정 전체 수정</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1.0}
                  style={styles.button}
                  onPress={() => handleSetEdit(false)}
                >
                  <Text style={styles.continueText}>해당 일정만 수정</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default RepeatModal;

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
