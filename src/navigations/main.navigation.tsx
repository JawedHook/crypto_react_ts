import React from 'react';
import { createMaterialBottomTabNavigator, NavigationMaterialBottomTabScreenComponent } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { DefaultTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SavedCoinScreen from '../screens/saved-coin.screen';
import CoinScreen from '../screens/coin.screen';
import HomeScreen from '../screens/home.screen';

const CoinsNavigation = createStackNavigator(
  {
    coins: {
      screen: HomeScreen,
      navigationOptions: {
        headerTitle: 'Accueil',
      },
    },
    coin: {
      screen: CoinScreen,
      navigationOptions: {
        headerTitle: 'Saved',
      },
    },
  },
  {
    initialRouteName: 'coins',
  },
);

const SavedNavigation = createStackNavigator(
  {
    savedCoin: {
      screen: SavedCoinScreen,
      navigationOptions: {
        headerTitle: 'Accueil',
      },
    },
    coin: {
      screen: CoinScreen,
      navigationOptions: {
        headerTitle: 'saved',
      },
    },
  },
  {
    initialRouteName: 'savedCoin',
  },
);

const MainNavigation: NavigationMaterialBottomTabScreenComponent = createMaterialBottomTabNavigator(
  {
    coins: {
      screen: CoinsNavigation,
      navigationOptions: {
        tabBarLabel: 'Coins',
        tabBarIcon: ({ tintColor }) => <Icon color={tintColor} size={25} name={'home'} />,
        tabBarColor: DefaultTheme.colors.primary,
      },
    },
    saved: {
      screen: SavedNavigation,
      navigationOptions: {
        tabBarLabel: 'Saved',
        tabBarIcon: ({ tintColor }) => <Icon color={tintColor} size={25} name={'heart'} />,
        tabBarColor: DefaultTheme.colors.accent,
      },
    },
  },
  {
    initialRouteName: 'coins',
    shifting: true,
  },
);

export default MainNavigation;
