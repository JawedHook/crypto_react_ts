/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { createAppContainer, NavigationContainer } from 'react-navigation';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import store from './redux/store';
import SwitchNavigation from './navigations/switch.navigation';

const App = () => {

  const [isReady, setIsReady] = useState<boolean>(false)

  useEffect(() => {
    const loadFont = async():Promise<void> => {
      await Font.loadAsync(
        'antoutline',
        // eslint-disable-next-line
        require('@ant-design/icons-react-native/fonts/antoutline.ttf')
      );
  
      await Font.loadAsync(
        'antfill',
        // eslint-disable-next-line
        require('@ant-design/icons-react-native/fonts/antfill.ttf')
      );
      
      setIsReady(true)
    }

    loadFont()
  })

  const AppNavigation: NavigationContainer = createAppContainer(SwitchNavigation);

  if(!isReady) {
    return <AppLoading/>
  }

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
