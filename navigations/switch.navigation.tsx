import React from 'react';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';

// Screen
import LoadingScreen from '../screens/loading.screen';
import LoginScreen from '../screens/Login.screen';

// Navigation
import MainNavigation from './main.navigation';

export default createAnimatedSwitchNavigator(
  {
    main: MainNavigation,
    login: LoginScreen,
    loading: LoadingScreen,
  },
  {
    transition: (
      <Transition.Together>
        <Transition.Out type="slide-bottom" durationMs={400} interpolation="easeIn" />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
    initialRouteName: 'loading',
  },
);
