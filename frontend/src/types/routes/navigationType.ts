export enum RouteScreens {
  OnboardingScreen = 'OnboardingScreen',
  RegisterPhoneScreen = 'RegisterPhoneScreen',
  RegisterInfoScreen = 'RegisterInfoScreen',
  LoginScreen = 'LoginScreen',
  ConnectPartnerScreen = 'ConnectPartnerScreen',
  MainScreen = 'MainScreen',

  // 일정 확인 페이지
  PlanCalendarScreen = 'PlanCalendarScreen',
  PlanDetailScreen = 'PlanDetailScreen',
  MainBottomTabScreen = 'MainBottomTabScreen',

  // 일정 생성 페이지 route
  PlanRoute = 'PlanRoute',
  PlanTitleScreen = 'PlanTitleScreen',
  PlanStartScreen = 'PlanStartScreen',
  PlanEndScreen = 'PlanEndScreen',
  PlanPlaceContentScreen = 'PlanPlaceContentScreen',
  PlanRepeatScreen = 'PlanRepeatScreen',

  // 기념일 페이지
  AnniversaryMainScreen = 'AnniversaryMainScreen',
  AnniversaryCreateScreen = 'AnniversaryCreateScreen',

  // 마이 페이지
  MyPageRoute = 'MyPageRoute',
  MyPageScreen = 'MyPageScreen',
  ChangePasswordScreen = 'ChangePasswordScreen',
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

  // 일정 확인 페이지 route
  PlanCalendarScreen: undefined;
  PlanDetailScreen: undefined;
  MainBottomTabScreen: undefined;

  // 일정 생성 페이지 route
  PlanRoute: undefined;
  PlanTitleScreen: undefined;
  PlanStartScreen: undefined;
  PlanEndScreen: undefined;
  PlanPlaceContentScreen: undefined;
  PlanRepeatScreen: undefined;

  // 기념일 페이지 route
  AnniversaryMainScreen: undefined;
  AnniversaryCreateScreen: undefined;

  // 마이 페이지
  MyPageRoute: undefined;
  MyPageScreen: undefined;
  ChangePasswordScreen: undefined;
};

// bottom navigation
export type BottomTabList = {
  MainScreen: undefined;
  PlanCalendarScreen: undefined;
  AnniversaryMainScreen: undefined;
};

export enum BottomScreens {
  BottomAnniversaryScreen = 'AnniversaryMainScreen',
  BottomMainScreen = 'MainScreen',
  BottomPlanCalendarScreen = 'PlanCalendarScreen',
}
