import React from 'react';
import {
  Text,
  View,
  Modal,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { ModalProps } from '../../types/modalType';
import ButtonComponent from '../design/ButtonComponent';
import Close from '../../assets/images/close.svg';

const ModalComponent = ({ visible, setModalVisible }: ModalProps) => {
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modal}>
          <TouchableHighlight
            onPress={() => setModalVisible(false)}
            style={styles.closeView}
          >
            <Close />
          </TouchableHighlight>
          {/* 모달창 디자인에따라 컴포넌트 구조 변경 예정 */}
          <View style={styles.textView}>
            <Text style={styles.haedFont}>나의 초대코드</Text>
            <Text style={styles.subFont}>ABC123</Text>
          </View>
          <View style={styles.buttonView}>
            <ButtonComponent
              disabled={false}
              text="코드 복사하기"
              font="bold"
              onPress={() => console.log('copy')}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default ModalComponent;
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  modal: {
    width: '85%',
    height: '55%',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 9,
    paddingTop: 15,
    paddingBottom: 24,
  },
  closeView: {
    marginRight: 15,
    alignItems: 'flex-end',
  },
  textView: {
    alignItems: 'center',
  },
  haedFont: {
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: 18,
    color: '#000000',
  },
  subFont: {
    fontFamily: 'Pretendard-Medium',
    fontWeight: '700',
    fontSize: 32,
    letterSpacing: 5,
    marginTop: 24,
    color: '#000000',
  },
  buttonView: {},
});
