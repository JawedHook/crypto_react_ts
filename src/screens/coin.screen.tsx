import React from 'react';
import { Text, View } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { Button } from 'react-native-paper';

const CoinScreen: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  return (
    <View>
      <Text>Coin view</Text>
      <Button onPress={() => navigation.navigate('Main')}>Go to main</Button>
    </View>
  );
};

export default withNavigation(CoinScreen);
