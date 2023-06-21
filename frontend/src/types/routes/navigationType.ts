export enum RouteScreens {
  OnboardingScreen = 'OnboardingScreen',
  RegisterPhoneScreen = 'RegisterPhoneScreen',
  RegisterInfoScreen = 'RegisterInfoScreen',
  LoginScreen = 'LoginScreen',
  ConnectPartnerScreen = 'ConnectPartnerScreen',
  MainScreen = 'MainScreen',
  PlanCalendarScreen = 'PlanCalendarScreen',
}

// 필요한 파라미터가 없는 상태
export type StackParamList = {
  OnboardingScreen: undefined;
  RegisterPhoneScreen: undefined;
  RegisterInfoScreen: {
    phone: string;
  };
  LoginScreen: undefined;
  ConnectPartnerScreen: undefined;
  MainScreen: undefined;
  PlanCalendarScreen: undefined;
};
