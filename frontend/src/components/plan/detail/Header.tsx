import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import XButton from '../../../assets/images/plan/xbutton.svg';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        {/* 버튼 클릭시 다시 일정 화면으로 리다이렉션 */}
        <XButton />
        <TouchableOpacity
          activeOpacity={1.0}
          onPress={() => console.log('일정 추가 완료')}
        >
          <Text style={styles.headerText}>추가</Text>
        </TouchableOpacity>
      </View>

      {/* 일정 input */}
      <View style={styles.inputView}>
        <TextInput
          placeholder="일정 제목을 입력하세요"
          placeholderTextColor="#909090"
          style={{ fontSize: 24, fontFamily: 'Pretendard-Medium' }}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  headerView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputView: {
    marginTop: 25,
    fontSize: 24,
    fontFamily: 'Pretendard-Medium',
    color: '#000000',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Pretendard-Medium',
    color: '#000000',
  },
});
