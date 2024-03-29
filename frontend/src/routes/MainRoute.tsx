import React from 'react';
import { Platform } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  BottomScreens,
  BottomTabList,
  RouteScreens,
  StackParamList,
} from '../types/routes/navigationType';
import RegisterPhoneNum from '../screens/RegisterPhoneNum';
import RegisterUserInfo from '../screens/RegisterUserInfo';
import Login from '../screens/Login';
import Onboarding from '../screens/Onboarding';
import ConnectPartner from '../screens/ConnectPartner';
import Main from '../screens/Main';
import PlanRoute from './PlanRoute';
import Calendar from '../assets/images/main/calendar.svg';
import OnCalendar from '../assets/images/main/onCalendar.svg';
import Anniversary from '../assets/images/main/anniversary.svg';
import OnAnniversary from '../assets/images/main/onAnniversary.svg';
import BottomTabButton from '../components/design/BottomTabButton';
import CustomTabIcon from '../components/design/CustomTabIcon';
import CheckCalendar from '../screens/CheckCalendar';
import MyPageRoute from './MyPageRoute';
import AnniversaryMainScreen from '../screens/Anniversary/AnniversaryMainScreen';
import AnniversaryCreateScreen from '../screens/Anniversary/AnniversaryCreateScreen';

const Stack = createStackNavigator<StackParamList>();
const BottomTab = createBottomTabNavigator<BottomTabList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

// BottomTab
const MainScreenBottomTabRouter = () => {
  return (
    <BottomTab.Navigator
      initialRouteName={BottomScreens.BottomMainScreen}
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
        tabBarActiveTintColor: '#FC887B',
        tabBarInactiveTintColor: '#707070',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          fontFamily: 'Pretendard-Regular',
          bottom: Platform.OS === 'android' ? 30 : undefined,
        },
        tabBarStyle: {
          height: 90,
          borderRadius: Platform.OS === 'ios' ? 15 : undefined,
          borderWidth: 1.5,
          borderColor: '#dfdfdfe1',
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <BottomTab.Screen
        name={BottomScreens.BottomPlanCalendarScreen}
        component={CheckCalendar}
        options={() => ({
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon
              icon={focused ? <OnCalendar /> : <Calendar />}
              focused={focused}
            />
          ),
          tabBarLabel: '일정',
        })}
      />
      <BottomTab.Screen
        name={BottomScreens.BottomMainScreen}
        component={Main}
        options={{
          tabBarButton: ({ onPress }) => (
            <BottomTabButton onPress={onPress} label="홈" />
          ),
        }}
      />
      <BottomTab.Screen
        name={BottomScreens.BottomAnniversaryScreen}
        component={AnniversaryMainScreen}
        options={() => ({
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon
              icon={focused ? <OnAnniversary /> : <Anniversary />}
              focused={focused}
            />
          ),
          tabBarLabel: '기념일',
        })}
      />
    </BottomTab.Navigator>
  );
};

// Main Route
const MainRoute = () => {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={RouteScreens.OnboardingScreen}
          component={Onboarding}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteScreens.RegisterPhoneScreen}
          component={RegisterPhoneNum}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteScreens.RegisterInfoScreen}
          component={RegisterUserInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteScreens.LoginScreen}
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteScreens.ConnectPartnerScreen}
          component={ConnectPartner}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteScreens.MainBottomTabScreen}
          component={MainScreenBottomTabRouter}
          options={{ headerShown: false }}
        />
        {/* 일정 추가 route */}
        <Stack.Screen
          name={RouteScreens.PlanRoute}
          component={PlanRoute}
          options={{ headerShown: false }}
        />
        {/* 기념일 */}
        <Stack.Screen
          name={RouteScreens.AnniversaryCreateScreen}
          component={AnniversaryCreateScreen}
          options={{ headerShown: false }}
        />
        {/* 마이 페이지 route */}
        <Stack.Screen
          name={RouteScreens.MyPageRoute}
          component={MyPageRoute}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRoute;
