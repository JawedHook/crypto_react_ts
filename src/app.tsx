import React from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer, NavigationContainer } from 'react-navigation';

import SwitchNavigation from './navigations/switch.navigation';
import NavigationService from './services/navigation.service';
import { DefaultTheme } from 'react-native-paper';

const App = () => {
  const AppNavigation: NavigationContainer = createAppContainer(SwitchNavigation);

  return (
    <>
      <StatusBar backgroundColor={DefaultTheme.colors.primary} barStyle="light-content" />
      <AppNavigation
        ref={(navigatorRef: any) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </>
  );
};

export default App;
