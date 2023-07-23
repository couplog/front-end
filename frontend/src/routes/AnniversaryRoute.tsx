import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteScreens, StackParamList } from '../types/routes/navigationType';
import AnniversaryMainScreen from '../screens/Anniversary/AnniversaryMainScreen';
import AnniversaryCreateScreen from '../screens/Anniversary/AnniversaryCreateScreen';

const Stack = createStackNavigator<StackParamList>();

const AnniversaryRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RouteScreens.AnniversaryMainScreen}
        component={AnniversaryMainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RouteScreens.AnniversaryCreateScreen}
        component={AnniversaryCreateScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AnniversaryRoute;
