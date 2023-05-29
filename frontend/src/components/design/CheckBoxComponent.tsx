import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Checkbox = () => {
  // 디자인 팀에서 체크박스 활성화 부분 디자인 나오기 전까지 임시 구현!
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <TouchableOpacity onPress={handleCheckboxToggle}>
      <View
        style={{
          width: 24,
          height: 24,
          borderWidth: 2,
          borderRadius: 4,
          borderColor: isChecked ? '#000000' : '#A0A0A0',
          backgroundColor: isChecked ? '#000000' : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isChecked && (
          <Text
            style={{
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: 14,
            }}
          >
            ✓
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Checkbox;
