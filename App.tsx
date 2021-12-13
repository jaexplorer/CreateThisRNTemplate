import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { loadAssetsAsync } from './assets/utils/AssetHelper';
import RootNavigation from './src/navigation/Navigation';
import { RootStackParamList } from './src/navigation/NavigationConstants';
import { getActiveRouteName } from './src/navigation/NavigationUtils';
import store, { persistor } from './src/redux/store';
import { ThemeProvider } from './src/Theme';
import * as Sentry from '@sentry/react-native';
import { logScreen, setupAnalytics } from './src/analytics/Analytics';
import { linking } from './src/Deeplinking';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RNBootSplash from 'react-native-bootsplash';

interface AppProps {}

const App: FC<AppProps> = ({}) => {
  const [loading, setLoading] = useState(true);
  const routeNameRef = useRef<string>();
  const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null);
  const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

  useEffect(() => {
    setupAnalytics(routingInstrumentation);
    loadAssetsAsync().then(() => setLoading(false));
    const state = navigationRef?.current?.getRootState();
    routeNameRef.current = getActiveRouteName(state);
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      onStateChange={(state): void => {
        const currentRouteName = getActiveRouteName(state);
        logScreen(currentRouteName);
        routeNameRef.current = currentRouteName;
      }}
      onReady={() => {
        routingInstrumentation.registerNavigationContainer(navigationRef);
        RNBootSplash.hide({ fade: true });
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <ReduxProvider store={store}>
            <PersistGate loading={<></>} persistor={persistor}>
              <Sentry.TouchEventBoundary>
                <RootNavigation />
              </Sentry.TouchEventBoundary>
            </PersistGate>
          </ReduxProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default App;
