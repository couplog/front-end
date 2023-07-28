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

  // 일정 생성 페이지 route
  PlanRoute = 'PlanRoute',
  PlanTitleScreen = 'PlanTitleScreen',
  PlanStartScreen = 'PlanStartScreen',
  PlanEndScreen = 'PlanEndScreen',
  PlanPlaceContentScreen = 'PlanPlaceContentScreen',
  PlanRepeatScreen = 'PlanRepeatScreen',

  // 기념일 페이지
  AnniversaryRoute = 'AnniversaryRoute',
  AnniversaryMainScreen = 'AnniversaryMainScreen',
  AnniversaryCreateScreen = 'AnniversaryCreateScreen',
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

  // 일정 생성 페이지 route
  PlanRoute: { id?: number | null; detail?: object };
  PlanTitleScreen: { id?: number | null; detail?: object };
  PlanStartScreen: undefined;
  PlanEndScreen: undefined;
  PlanPlaceContentScreen: undefined;
  PlanRepeatScreen: undefined;

  // 기념일 페이지 route
  AnniversaryRoute: undefined;
  AnniversaryMainScreen: undefined;
  AnniversaryCreateScreen: undefined;
};
