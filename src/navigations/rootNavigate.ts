// RootNavigation.ts
import { createNavigationContainerRef } from '@react-navigation/native';
import { RootParamList } from './types';

export const navigationRef = createNavigationContainerRef<RootParamList>();

export function navigate<RouteName extends keyof RootParamList>(
  name: RouteName,
  params?: RootParamList[RouteName]
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as any, params as any);
  }
}