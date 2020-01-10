import { createMaterialBottomTabNavigator, NavigationMaterialBottomTabScreenComponent } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import SavedCoinScreen from '../screens/saved-coin.screen';
import CoinScreen from '../screens/coin.screen';
import HomeScreen from '../screens/home.screen';

const MainNavigation: NavigationMaterialBottomTabScreenComponent = createMaterialBottomTabNavigator(
  {
    coins: createStackNavigator(
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
    ),
    saved: createStackNavigator(
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
    ),
  },
  {
    initialRouteName: 'coins',
  },
);

export default MainNavigation;
