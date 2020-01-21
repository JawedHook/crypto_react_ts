import React, { useEffect, useState } from 'react';
import { NavigationScreenComponent, NavigationInjectedProps } from 'react-navigation';
import { Appbar, DefaultTheme } from 'react-native-paper';

import Layout from '../components/layout.component';
import coinApiService from '../services/coin-api.service';
import { Coin } from '../models/coin.model';
import Loader from '../components/loader.component';
import CoinCard from '../components/coin-card.component';

interface IProps extends NavigationInjectedProps {}

const CoinScreen: NavigationScreenComponent<any, IProps> = ({
  navigation: {
    state: {
      params: { symbol, fromHome, min, max },
    },
  },
}) => {
  const [coin, setCoin] = useState<Coin>(null);

  useEffect(() => {
    const getCoinAsync = async () => {
      const response = await coinApiService.getCoin(symbol);
      let coinApi: Coin;
      if (fromHome) {
        coinApi = new Coin(response.data);
      } else {
        coinApi = new Coin({ ...response.data, min, max });
      }
      setCoin(coinApi);
    };
    getCoinAsync();
  }, []);

  return <Layout>{coin ? <CoinCard coin={coin} isPreview={false} fromHome={fromHome} /> : <Loader />}</Layout>;
};

CoinScreen.navigationOptions = {
  title: 'Coin',
  header: ({ previous, navigation }) => {
    const backgroundColor = previous.descriptor.options.title === 'Home' ? DefaultTheme.colors.primary : DefaultTheme.colors.accent;
    return (
      <Appbar.Header style={{ backgroundColor }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={navigation.state.params.symbol} />
      </Appbar.Header>
    );
  },
};

export default CoinScreen;
