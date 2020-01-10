import SavedCoinScreen from '../screens/saved-coin.screen';
import CoinScreen from '../screens/coin.screen';
import HomeScreen from '../screens/Home.screen';

import { createMaterialBottomTabNavigator, NavigationMaterialBottomTabScreenComponent } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';

const MainNavigation: NavigationMaterialBottomTabScreenComponent = createMaterialBottomTabNavigator(
  {
    Coins: createStackNavigator(
      {
        Coins: {
          screen: HomeScreen,
          navigationOptions: {
            headerTitle: 'Accueil',
            tabBarColor: 'blue',
          },
        },
        Coin: {
          screen: CoinScreen,
          navigationOptions: {
            headerTitle: 'Saved',
            tabBarColor: 'red',
          },
        },
      },
      {
        initialRouteName: 'Coins',
      },
    ),
    Saved: createStackNavigator(
      {
        SavedCoin: {
          screen: SavedCoinScreen,
          navigationOptions: {
            headerTitle: 'Accueil',
            tabBarColor: 'blue',
          },
        },
        Coin: {
          screen: CoinScreen,
          navigationOptions: {
            headerTitle: 'Saved',
            tabBarColor: 'red',
          },
        },
      },
      {
        initialRouteName: 'SavedCoin',
      },
    ),
  },
  {
    initialRouteName: 'Coins',
  },
);

export default MainNavigation;
