import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';

const Checkbox = () => {
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
          borderRadius: 12,
          borderWidth: 2,
          borderColor: '#EDF0F3',
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isChecked && (
          <View
            style={{
              width: '80%',
              height: '80%',
              borderRadius: 12,
              backgroundColor: '#000000',
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Checkbox;
