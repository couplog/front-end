import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { myStyles } from './Profile';
import RightArrow from '../../assets/images/common/rightArrow.svg';
import { ContentProps } from '../../types/myPage/types';

const ContentBox = ({ title, onPress, top, user }: ContentProps) => {
  return user ? (
    <TouchableOpacity activeOpacity={1.0} onPress={onPress}>
      <View style={[myStyles.container, { marginTop: top }]}>
        <Text style={myStyles.userText}>{title}</Text>
      </View>
    </TouchableOpacity>
  ) : (
    <View style={[myStyles.container, { marginTop: top }]}>
      <Text style={myStyles.contentText}>{title}</Text>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1.0}
        style={{ marginRight: 8 }}
      >
        <RightArrow />
      </TouchableOpacity>
    </View>
  );
};

export default ContentBox;
