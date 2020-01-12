import * as React from 'react';
import { AppRegistry } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './src/app';

import store from './src/redux/store';

export default function Main() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaProvider>
          <App />
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent('main', () => Main);
