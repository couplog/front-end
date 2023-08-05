import React from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { ModalProps } from '../../types/components/modalType';
import ButtonComponent from '../design/ButtonComponent';
import Close from '../../assets/images/common/close.svg';

const ModalComponent = ({ visible, setModalVisible, code }: ModalProps) => {
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modal}>
          <View style={styles.closeButton}>
            <TouchableOpacity
              activeOpacity={1.0}
              onPress={() => setModalVisible(false)}
            >
              <Close />
            </TouchableOpacity>
          </View>
          <View style={styles.textView}>
            <Text style={styles.headFont}>나의 초대코드</Text>
            <Text style={styles.subFont}>{code}</Text>
          </View>
          <View>
            <ButtonComponent
              disabled={false}
              text="코드 복사하기"
              font="regular"
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
    height: '50%',
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
    fontFamily: 'Pretendard-Medium',
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
