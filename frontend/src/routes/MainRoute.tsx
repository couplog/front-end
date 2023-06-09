import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteScreens, StackParamList } from '../types/routes/navigationType';
import RegisterPhoneNum from '../screens/RegisterPhoneNum';
import RegisterUserInfo from '../screens/RegisterUserInfo';
import Login from '../screens/Login';
import Onboarding from '../screens/Onboarding';
import ConnectPartner from '../screens/ConnectPartner';
import Main from '../screens/Main';

const Stack = createStackNavigator<StackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
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
          name={RouteScreens.MainScreen}
          component={Main}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRoute;
