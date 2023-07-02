import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../state/atoms/userAtom';
import { partnerState } from '../../state/atoms/partnerAtom';
import Arrow from '../../assets/images/common/arrow.svg';

const Dropdown = () => {
  const userData = useRecoilValue(userState);
  const partnerData = useRecoilValue(partnerState);
  const filterData = [
    ['전체', '#EDF0F3'],
    ['데이트', '#FC887B'],
    [`${partnerData.name}`, '#FFDD95'],
    [`${userData.name}`, '#D0E6A5'],
  ];

  return (
    <View style={styles.containerView}>
      <SelectDropdown
        defaultButtonText={filterData[0][0]}
        data={filterData}
        dropdownOverlayColor="none"
        buttonStyle={styles.dropdownButtonView}
        buttonTextStyle={styles.dropdownButtonText}
        renderDropdownIcon={(isOpened) => {
          return (
            <Arrow
              style={{
                transform: [{ rotate: isOpened ? '180deg' : '0deg' }],
              }}
            />
          );
        }}
        dropdownStyle={styles.dropdownContainerView}
        renderCustomizedRowChild={(item) => {
          return (
            <View style={styles.rowChildView}>
              <View
                style={{
                  ...styles.circleView,
                  backgroundColor: item[1],
                }}
              />
              <Text>{item[0]}</Text>
            </View>
          );
        }}
        rowTextStyle={styles.rowChildText}
        rowStyle={styles.rowDividerView}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem) => {
          return selectedItem[0];
        }}
        rowTextForSelection={(item) => {
          return item[0];
        }}
      />
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 16,
    marginRight: 8,
  },
  dropdownButtonView: {
    backgroundColor: '#FFFFFF',
    width: 120,
  },
  dropdownButtonText: {
    fontFamily: 'Pretendard-Medium',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'right',
    color: '#909090',
  },
  dropdownContainerView: {
    height: 128,
    backgroundColor: '#FFFFFF',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      width: 6,
      height: 4,
    },
    shadowColor: '#000',
    borderColor: 'rgba(22,20,10,0.1)',
    overflow: 'visible',
    borderRadius: 8,
  },
  rowChildView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 23,
  },
  circleView: {
    height: 12,
    width: 12,
    borderRadius: 1000,
    marginRight: 12,
  },
  rowChildText: {
    fontFamily: 'Pretendard-Medium',
    fontWeight: '400',
    fontSize: 14,
    marginLeft: 23,
    textAlign: 'left',
    color: '#000000',
  },
  rowDividerView: {
    height: 32,
    borderBottomColor: '#EDF0F3',
  },
});
