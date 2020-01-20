import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { NavigationScreenComponent, NavigationInjectedProps } from 'react-navigation';
import { Appbar, DefaultTheme, Button } from 'react-native-paper';

import Layout from '../components/layout.component';
import CoinList from '../components/coin-list.component';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUserCoins } from '../redux/user/user.selectors';
import { connect } from 'react-redux';
import { UserCoin, Coin } from '../models/coin.model';
import { selectCoins } from '../redux/coins/coins.selectors';

interface IProps extends NavigationInjectedProps {
  currentUserCoins: UserCoin[];
  coins: Coin[];
}

const SavedCoinScreen: NavigationScreenComponent<any, IProps> = ({ currentUserCoins, coins }) => {
  const [savedCoins, setSavedCoins] = useState<Coin[]>([]);

  const getSavedCoinsFromCoin = () => {
    const filteredCoins = currentUserCoins.map((currentUserCoin: UserCoin) => {
      const { symbol, min, max } = currentUserCoin;
      const matchedCoin = coins.find((coin: Coin) => coin.symbol === symbol);
      return new Coin({ ...matchedCoin, min, max });
    });

    setSavedCoins(filteredCoins);
  };

  useEffect(() => {
    getSavedCoinsFromCoin();
  }, []);

  return (
    <Layout>
      <Text>Saved coin view</Text>
      <CoinList coins={savedCoins} fromHome={false} />
    </Layout>
  );
};

SavedCoinScreen.navigationOptions = {
  title: 'Saved',
  header: ({ scene, previous, navigation }) => {
    const { options } = scene.descriptor;
    const title =
      options.headerTitle !== undefined ? options.headerTitle : options.title !== undefined ? options.title : scene.route.routeName;
    return (
      <Appbar.Header style={{ backgroundColor: DefaultTheme.colors.accent }}>
        <Appbar.Content title={title} />
      </Appbar.Header>
    );
  },
};

const mapStateToProps = createStructuredSelector({
  currentUserCoins: selectCurrentUserCoins,
  coins: selectCoins,
});

export default connect(mapStateToProps)(SavedCoinScreen);
