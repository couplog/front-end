import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { handleAnniversaryComing } from '../../api/anniversary/anniversaryCome';
import { coupleState } from '../../state/atoms/coupleAtom';
import {
  AnniversaryComponentProps,
  OurAnniversaryComponentProps,
} from '../../types/main/mainPageTypes';
import { handleOurAnniversary } from '../../api/anniversary/ourAnniversary';
import OurAnniversary from './OurAnniversary';
import ComeAnniversary from './ComeAnniversary';
/* eslint-disable react/jsx-props-no-spreading */

// 수정/삭제 swipe는 캘린더 구현되면 component 가져와 쓸 예정 **
const TabViewComponent = () => {
  const coupleInfo = useRecoilValue(coupleState);
  const [index, setIndex] = useState(0);
  const [comeAnniversaries, setComeAnniversaries] = useState<
    AnniversaryComponentProps[]
  >([]);
  const [ourAnniversaries, setOurAnniversaries] = useState<
    OurAnniversaryComponentProps[]
  >([]);

  // TabViewComponent
  const ComeAnniversaryRoute = () => (
    <ComeAnniversary comeAnniversaries={comeAnniversaries} />
  );

  const OurAnniversaryRoute = () => (
    <OurAnniversary ourAnniversaries={ourAnniversaries} />
  );

  const renderScene = SceneMap({
    first: ComeAnniversaryRoute,
    second: OurAnniversaryRoute,
  });

  const [routes] = useState([
    { key: 'first', title: '다가오는 기념일' },
    { key: 'second', title: '우리의 기념일' },
  ]);

  // 최초 렌더링시 기념일 API 각각 호출
  useEffect(() => {
    fetchAnniversaryComing(coupleInfo.coupleId, 10);
    fetchOurAnniversary(coupleInfo.coupleId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 다가오는 기념일 조회
  const fetchAnniversaryComing = async (
    coupleId: number | null,
    size: number
  ) => {
    try {
      const res = await handleAnniversaryComing(coupleId, size);
      const anniversariesData = res.data.data.anniversaries;
      setComeAnniversaries(anniversariesData);
    } catch (error) {
      console.log(error);
    }
  };

  // 우리의 기념일 조회
  const fetchOurAnniversary = async (coupleId: number | null) => {
    try {
      const res = await handleOurAnniversary(coupleId);
      const anniversariesData = res.data.data.anniversaries;
      setOurAnniversaries(anniversariesData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.tabContainer}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        style={styles.tabView}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            activeColor="#000000"
            inactiveColor="#909090"
            labelStyle={styles.labelText}
            indicatorStyle={styles.indicatorStyle}
            style={styles.tabBar}
          />
        )}
      />
    </View>
  );
};

export default TabViewComponent;

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingTop: 30,
  },
  tabView: {
    width: '100%',
    backgroundColor: '#F8F8F8',
  },
  labelText: {
    fontFamily: 'Pretendard-Medium',
    fontWeight: '500',
    fontSize: 16,
  },
  indicatorStyle: {
    backgroundColor: '#000000',
    marginVertical: -1.4,
  },
  tabBar: {
    backgroundColor: '#F8F8F8',
    borderBottomColor: '#909090',
    borderBottomWidth: 1,
  },
  dayView: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginTop: 13,
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayInfoText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Pretendard-Regular',
  },
  dateText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Pretendard-Regular',
    color: '#909090',
  },
  dDayText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Pretendard-Regular',
    color: '#000000',
  },
  textFlex: {
    flexDirection: 'row',
    gap: 15,
  },
});