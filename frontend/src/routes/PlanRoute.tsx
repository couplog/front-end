import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteScreens, StackParamList } from '../types/routes/navigationType';
import PlanStart from '../screens/PlanDetail/PlanStart';
import PlanTitle from '../screens/PlanDetail/PlanTitle';
import PlanEnd from '../screens/PlanDetail/PlanEnd';
import PlanPlaceContent from '../screens/PlanDetail/PlanPlaceContent';
import PlanRepeat from '../screens/PlanDetail/PlanRepeat';

const Stack = createStackNavigator<StackParamList>();

const PlanRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RouteScreens.PlanTitleScreen}
        component={PlanTitle}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RouteScreens.PlanStartScreen}
        component={PlanStart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RouteScreens.PlanEndScreen}
        component={PlanEnd}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RouteScreens.PlanPlaceContentScreen}
        component={PlanPlaceContent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RouteScreens.PlanRepeatScreen}
        component={PlanRepeat}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default PlanRoute;
