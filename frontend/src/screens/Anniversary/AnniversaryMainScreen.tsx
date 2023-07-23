import { SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { useRecoilValue } from 'recoil';
import Profile from '../../components/main/Profile';
import { coupleState } from '../../state/atoms/coupleAtom';
import Header from '../../components/anniversary/Header';
import TabViewComponent from '../../components/anniversary/TabViewComponent';
import { StackParamList } from '../../types/routes/navigationType';

export type Props = StackScreenProps<StackParamList, 'AnniversaryMainScreen'>;

const AnniversaryMainScreen = ({ navigation }: Props) => {
  const coupleInfo = useRecoilValue(coupleState);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Header
          handleMain={() => navigation.navigate('MainScreen')}
          onPress={() => navigation.navigate('AnniversaryCreateScreen')}
        />

        <View style={styles.margin} />

        <Profile meetDate={coupleInfo.firstDate} anniversary />

        <TabViewComponent />
      </View>
    </SafeAreaView>
  );
};

export default AnniversaryMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  wrapper: {
    flex: 1,
    marginLeft: 25,
    marginRight: 25,
  },
  margin: {
    marginBottom: 30,
  },
});
