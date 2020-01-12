import React, { useEffect, useState } from 'react';
import { createAppContainer, NavigationContainer } from 'react-navigation';

import SwitchNavigation from './navigations/switch.navigation';
import NavigationService from './services/navigation.service';

const App = () => {
  const AppNavigation: NavigationContainer = createAppContainer(SwitchNavigation);

  return (
    <AppNavigation
      ref={(navigatorRef: any) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  );
};

export default App;
