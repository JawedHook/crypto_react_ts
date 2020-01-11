import React, { useEffect, useState } from 'react';
import { createAppContainer, NavigationContainer } from 'react-navigation';

import SwitchNavigation from './navigations/switch.navigation';

const App = () => {
  const AppNavigation: NavigationContainer = createAppContainer(SwitchNavigation);

  return <AppNavigation />;
};

export default App;
