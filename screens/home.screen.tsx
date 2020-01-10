import React from 'react';
import { Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { ListView, Card, Button } from '@ant-design/react-native';

import { logout } from '../services/firebase.service';
import coinApiService from '../services/coin-api.service';
import { Coins } from '../models/coin.model';

const HomeScreen: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  const onFetchDatas: any = async (page: number = 1, startFetch: (coins: any, pageLimit: number) => void, abortFetch: () => void) => {
    try {
      const coinsResponse: any = await coinApiService.getCoins();
      const { coins } = coinsResponse.data;
      startFetch(coins, 1000);
    } catch (err) {
      abortFetch();
    }
  };

  const openCoinDetail: any = (symbol: string) => {
    navigation.navigate('Coin');
  };

  const renderItem: any = (coinItem: any) => {
    const coin = new Coins(coinItem);
    return (
      <TouchableOpacity onPress={() => openCoinDetail(coin.symbol)}>
        <Card full>
          <Card.Header title={coin.name} thumbStyle={{ width: 30, height: 30 }} extra={`${coin.price}€`} />
          <Card.Body>
            <View style={{ height: 42 }}>
              <Text style={{ marginLeft: 16 }}>{coin.delta_24h}</Text>
            </View>
          </Card.Body>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#f5f5f9' }}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <Button onPress={logout}>Logout</Button>
      <ListView onFetch={onFetchDatas} keyExtractor={(item, index) => `${index}`} renderItem={renderItem} numColumns={1} />
    </ScrollView>
  );
};

export default HomeScreen;
