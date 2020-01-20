import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationScreenComponent, NavigationInjectedProps } from 'react-navigation';
import { Button, Appbar, DefaultTheme, Card, IconButton, FAB, ActivityIndicator } from 'react-native-paper';
import Layout from '../components/layout.component';
import coinApiService from '../services/coin-api.service';
import { Coin } from '../models/coin.model';
import Loader from '../components/loader.component';
import DeltaCoinCard from '../components/delta-coin-card.component';

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

  const saveCoin: any = (symbol: string) => {
    // to do
  };

  return (
    <Layout>
      {coin ? (
        <Card style={{ marginBottom: 15 }}>
          <Card.Title title={coin.name} subtitle={coin.symbol} right={() => <DeltaCoinCard delta={coin.delta_24h} />} />
          <Card.Content>
            <Text>Price: {coin.price.split('.')[0]}€</Text>
            <Text>Delta: {coin.delta_24h}% last 24h</Text>
            <Text>Rank: #{coin.rank}</Text>
            {!fromHome && (
              <>
                <Text>Min: {coin.min}</Text>
                <Text>Max: {coin.max}</Text>
              </>
            )}
          </Card.Content>
          <Card.Actions>
            <IconButton onPress={() => saveCoin(coin.symbol)} icon="heart-outline" color={DefaultTheme.colors.notification} />
          </Card.Actions>
        </Card>
      ) : (
        <Loader />
      )}
    </Layout>
  );
};

CoinScreen.navigationOptions = {
  title: 'Coin',
  header: ({ scene, previous, navigation }) => {
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
