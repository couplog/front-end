import React from 'react';
import {
  Text,
  View,
  Modal,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { ModalProps } from '../../types/components/modalType';
import ButtonComponent from '../design/ButtonComponent';
import Close from '../../assets/images/close.svg';

const ModalComponent = ({ visible, setModalVisible, code }: ModalProps) => {
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modal}>
          <View style={styles.closeButton}>
            <Close onPress={() => setModalVisible(false)} />
          </View>
          {/* 모달창 디자인에따라 컴포넌트 구조 변경 예정 */}
          <View style={styles.textView}>
            <Text style={styles.headFont}>나의 초대코드</Text>
            <Text style={styles.subFont}>{code}</Text>
          </View>
          <View style={styles.buttonView}>
            <ButtonComponent
              disabled={false}
              text="코드 복사하기"
              font="bold"
              onPress={() => Clipboard.setString(code)}
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
  closeButton: {
    marginRight: 15,
    alignItems: 'flex-end',
  },
  textView: {
    alignItems: 'center',
  },
  headFont: {
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: 18,
    color: '#000000',
  },
  subFont: {
    fontFamily: 'Pretendard-Bold',
    fontWeight: '700',
    fontSize: 32,
    letterSpacing: 5,
    marginTop: 24,
    color: '#000000',
  },
});
