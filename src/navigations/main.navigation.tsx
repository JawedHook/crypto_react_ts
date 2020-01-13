import React from 'react';
import { createMaterialBottomTabNavigator, NavigationMaterialBottomTabScreenComponent } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { DefaultTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SavedCoinScreen from '../screens/saved-coin.screen';
import CoinScreen from '../screens/coin.screen';
import HomeScreen from '../screens/home.screen';
import AccountScreen from '../screens/account.screen';

const CoinsNavigation = createStackNavigator(
  {
    coins: HomeScreen,
    coin: CoinScreen,
  },
  {
    initialRouteName: 'coins',
  },
);

const SavedNavigation = createStackNavigator(
  {
    savedCoin: SavedCoinScreen,
    coin: CoinScreen,
  },
  {
    initialRouteName: 'savedCoin',
  },
);

const MainNavigation: NavigationMaterialBottomTabScreenComponent = createMaterialBottomTabNavigator(
  {
    saved: {
      screen: SavedNavigation,
      navigationOptions: {
        tabBarLabel: 'Saved',
        tabBarIcon: ({ tintColor }) => <Icon color={tintColor} size={25} name={'heart'} />,
        tabBarColor: DefaultTheme.colors.accent,
      },
    },
    coins: {
      screen: CoinsNavigation,
      navigationOptions: {
        tabBarLabel: 'Coins',
        tabBarIcon: ({ tintColor }) => <Icon color={tintColor} size={25} name={'home'} />,
        tabBarColor: DefaultTheme.colors.primary,
      },
    },
    account: {
      screen: AccountScreen,
    },
  },
  {
    initialRouteName: 'coins',
    shifting: true,
  },
);

export default MainNavigation;
