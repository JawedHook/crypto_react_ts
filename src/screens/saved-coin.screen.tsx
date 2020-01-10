import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '@ant-design/react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';

const SavedCoinScreen: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  return (
    <View>
      <Text>Saved coin view</Text>
    </View>
  );
};

export default withNavigation(SavedCoinScreen);
