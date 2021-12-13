import { NavigationState } from '@react-navigation/native';

/* Gets the current screen from navigation state */
export const getActiveRouteName = (state: NavigationState | undefined): string => {
  if (!state) {
    return '';
  }
  const route = state.routes[state.index];
  if (!route.state) {
    return route.name;
  } // Exit Condition
  // Dive into nested navigators recursively
  return getActiveRouteName(route.state as NavigationState) || route.name; // Fallback
};
