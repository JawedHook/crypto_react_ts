import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationScreenComponent, NavigationInjectedProps } from 'react-navigation';
import { Button, Appbar, DefaultTheme, Card, IconButton, FAB, ActivityIndicator } from 'react-native-paper';
import Layout from '../components/layout.component';
import coinApiService from '../services/coin-api.service';
import { Coin } from '../models/coin.model';

interface IProps extends NavigationInjectedProps { }

const CoinScreen: NavigationScreenComponent<any, IProps> = ({ navigation: { state, navigate } }) => {

  const [coin, setCoin] = useState<Coin>(null);

  useEffect(() => {
    const getCoinAsync = async () => {
      const response = await coinApiService.getCoin(state.params.symbol);
      let coinApi: Coin;
      if (state.params.fromHome) {
        coinApi = new Coin(response.data);
      } else {
        coinApi = new Coin({ min: state.params.min, max: state.params.max, ...response.data })
      }
      setCoin(coinApi);
    }
    getCoinAsync();
  }, []);

  const saveCoin: any = (symbol: string) => {
        // to do
    }

    const deltaCoinCard: any = (delta: string) => {
        const icon = delta.includes('-') ? 'arrow-down' : 'arrow-up'
        const color = delta.includes('-') ? DefaultTheme.colors.notification : DefaultTheme.colors.accent
        return (
            <FAB
                icon={icon}
                color={'white'}
                label={`${delta}%`}
                style={{ backgroundColor: color, paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, marginRight: 10 }}
                small
            />
        );
    }
  return (
    <Layout>
      {coin ?
        <Card style={{ marginBottom: 15 }}>
          <Card.Title
            title={coin.name} subtitle={coin.symbol}
            right={() => deltaCoinCard(coin.delta_24h)}
          />
          <Card.Content>
            <Text>Price: {coin.price.split('.')[0]}€</Text>
            <Text>Delta: {coin.delta_24h}% last 24h</Text>
            <Text>Rank: #{coin.rank}</Text>
          </Card.Content>
          <Card.Actions>
            <IconButton onPress={() => saveCoin(coin.symbol)} icon='heart-outline' color={DefaultTheme.colors.notification} />
          </Card.Actions>
        </Card>
        : 
        <View style={{flex: 1, alignItems : 'center', justifyContent : 'center'}}>
          <ActivityIndicator/>
        </View>        
      }
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
