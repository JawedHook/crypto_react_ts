import React from 'react';
import { Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';

import { logout } from '../services/firebase.service';
import coinApiService from '../services/coin-api.service';
import { Coins } from '../models/coin.model';
import Layout from '../components/layout.component';
import { Button, Card, Title, Paragraph, Caption } from 'react-native-paper';

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

  // const renderItem: any = (coinItem: any) => {
  //   const coin = new Coins(coinItem);
  //   return (
  //     <TouchableOpacity onPress={() => openCoinDetail(coin.symbol)}>
  //       <Card full>
  //         <Card.Header title={coin.name} thumbStyle={{ width: 30, height: 30 }} extra={`${coin.price}€`} />
  //         <Card.Body>
  //           <View style={{ height: 42 }}>
  //             <Text style={{ marginLeft: 16 }}>{coin.delta_24h}</Text>
  //           </View>
  //         </Card.Body>
  //       </Card>
  //     </TouchableOpacity>
  //   );
  // };

  return (
    <Layout>
      <Button onPress={logout}>Logout</Button>
      <Card>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={() => <Caption>left</Caption>}
          right={() => <Caption>right</Caption>}
        />
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </Layout>
  );
};

export default HomeScreen;