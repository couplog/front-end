export enum RouteScreens {
  OnboardingScreen = 'OnboardingScreen',
  RegisterPhoneScreen = 'RegisterPhoneScreen',
  RegisterInfoScreen = 'RegisterInfoScreen',
  LoginScreen = 'LoginScreen',
  ConnectPartnerScreen = 'ConnectPartnerScreen',
  MainScreen = 'MainScreen',
  PlanCalendarScreen = 'PlanCalendarScreen',
  MainBottomTabScreen = 'MainBottomTabScreen',

  // 일정 생성 페이지 route
  PlanRoute = 'PlanRoute',
  PlanTitleScreen = 'PlanTitleScreen',
  PlanStartScreen = 'PlanStartScreen',
  PlanEndScreen = 'PlanEndScreen',
  PlanPlaceContentScreen = 'PlanPlaceContentScreen',
  PlanRepeatScreen = 'PlanRepeatScreen',
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
  MainBottomTabScreen: undefined;

  // 일정 생성 페이지 route
  PlanRoute: undefined;
  PlanTitleScreen: undefined;
  PlanStartScreen: undefined;
  PlanEndScreen: undefined;
  PlanPlaceContentScreen: undefined;
  PlanRepeatScreen: undefined;
};

// bottom navigation
export type BottomTabList = {
  MainScreen: undefined;
  PlanCalendarScreen: undefined;
  LoginScreen: undefined;
};

export enum BottomScreens {
  BottomLoginScreen = 'LoginScreen',
  BottomMainScreen = 'MainScreen',
  BottomPlanCalendarScreen = 'PlanCalendarScreen',
}
