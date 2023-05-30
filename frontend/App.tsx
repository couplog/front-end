import React from 'react';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterPhoneNum from './src/screens/RegisterPhoneNum';
import RegisterUserInfo from './src/screens/RegisterUserInfo';
import Login from './src/screens/Login';

export enum RouteScreens {
  RegisterPhone = 'RegisterPhone',
  RegisterInfo = 'RegisterInfo',
  LoginScreen = 'Login',
}

function App() {
  const Stack = createStackNavigator();

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={RouteScreens.RegisterPhone}
            component={RegisterPhoneNum}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={RouteScreens.RegisterInfo}
            component={RegisterUserInfo}
            options={{ headerShown: false }}
          />
          <Stack.Screen name={RouteScreens.LoginScreen} component={Login} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default App;
