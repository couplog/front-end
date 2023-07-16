import React from 'react';
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
import PlanCalendar from '../screens/PlanCalendar';
import Calendar from '../assets/images/main/calendar.svg';
import Anniversary from '../assets/images/main/anniversary.svg';
import BottomTabButton from '../components/design/BottomTabButton';

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
        tabBarActiveTintColor: '#707070',
        tabBarInactiveTintColor: '#707070',
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Pretendard-Regular',
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          height: 90,
          borderTopWidth: 1,
          borderTopColor: '#dfdfdfe1',
        },
      }}
    >
      <BottomTab.Screen
        name={BottomScreens.BottomPlanCalendarScreen}
        component={PlanCalendar}
        options={{
          tabBarIcon: Calendar,
          tabBarLabel: '일정',
          tabBarIconStyle: {
            marginTop: 10,
          },
        }}
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
        // 추후 기념일 페이지로 수정 (현재 임시)
        name={BottomScreens.BottomLoginScreen}
        component={Login}
        options={{
          tabBarIcon: Anniversary,
          tabBarLabel: '기념일',
          tabBarIconStyle: {
            marginTop: 10,
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

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
        <Stack.Screen
          name={RouteScreens.PlanCalendarScreen}
          component={PlanCalendar}
          options={{ headerShown: false }}
        />
        {/* 일정 추가 route */}
        <Stack.Screen
          name={RouteScreens.PlanRoute}
          component={PlanRoute}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRoute;
