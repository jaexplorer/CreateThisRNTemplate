import analytics from '@react-native-firebase/analytics';
import LogRocket from '@logrocket/react-native';
import * as Sentry from '@sentry/react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import { EventName, EventValues } from './AnalyticsConstants';
import Config from 'react-native-config';

export const logEvent = async (name: EventName, values: EventValues = {}) => {
  await analytics().logEvent(name, values);
  crashlytics().log(name);
  Sentry.setContext(name, values);
  // Not supported yet
  // LogRocket.track(name, values);
};

export const logScreen = async (name: string) => {
  await analytics().logScreenView({
    screen_name: name,
    screen_class: name,
  });
  // Not supported yet
  // LogRocket.track('screen_changed', {
  //   screen_name: name,
  //   screen_class: name,
  // });
  Sentry.setContext('screen_changed', {
    screen_name: name,
  });
  crashlytics().log(`screen_changed - ${name}`);
};

export const logError = (error: any, ...optionalParams: any[]) => {
  Sentry.captureException(error);
  crashlytics().recordError(error);
  if (optionalParams && optionalParams.length > 0) {
    console.log(error, optionalParams);
  } else {
    console.log(error);
  }
};

export const setupAnalytics = (routingInstrumentation: Sentry.ReactNavigationInstrumentation) => {
  LogRocket.init(Config.LOGROCKET);
  Sentry.init({
    dsn: Config.SENTRY_DNS,
    debug: true,
    normalizeDepth: 10,
    attachStacktrace: true,
    integrations: [
      new Sentry.ReactNativeTracing({
        tracingOrigins: ['localhost', /^\//],
        routingInstrumentation,
      }),
    ],
  });
};
