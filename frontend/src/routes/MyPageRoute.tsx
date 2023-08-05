import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteScreens, StackParamList } from '../types/routes/navigationType';
import MyPageScreen from '../screens/MyPage/MyPageScreen';
import ChangePasswordScreen from '../screens/MyPage/ChangePasswordScreen';

const MyPageRoute = () => {
  const Stack = createStackNavigator<StackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RouteScreens.MyPageScreen}
        component={MyPageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RouteScreens.ChangePasswordScreen}
        component={ChangePasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MyPageRoute;
