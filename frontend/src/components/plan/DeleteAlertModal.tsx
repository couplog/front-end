import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import { handleDeleteMyPlan } from '../../api/plan/deletePlan';
import { DeleteMyPlanProps } from '../../types/calendar/calendarType';

const DeleteAlertModal = ({
  showModal,
  setShowModal,
  scheduleId,
  memberId,
  handleCheckPlanDetail,
  setFocus,
}: DeleteMyPlanProps) => {
  // 삭제 후 새로고침
  const handleReload = () => {
    handleCheckPlanDetail();
    setFocus((prev) => !prev);
  };

  // 삭제 로직
  const handleDeletePlan = (scheduleId: number | null, repeat: boolean) => {
    scheduleId &&
      handleDeleteMyPlan(memberId, scheduleId, repeat).then(() =>
        handleReload()
      );
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
                <Text style={styles.title}>일정 삭제</Text>
                <Text style={styles.modalText}>
                  반복 일정을 모두 삭제할까요?
                </Text>

                {/* button */}
                <TouchableOpacity
                  activeOpacity={1.0}
                  style={styles.button}
                  onPress={() => handleDeletePlan(scheduleId, true)}
                >
                  <Text style={styles.logoutText}>반복 일정 전체 삭제</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1.0}
                  style={styles.button}
                  onPress={() => handleDeletePlan(scheduleId, false)}
                >
                  <Text style={styles.continueText}>해당 일정만 삭제</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default DeleteAlertModal;

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
