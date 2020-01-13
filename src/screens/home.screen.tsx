import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Text, ScrollView, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NavigationInjectedProps, NavigationScreenComponent } from 'react-navigation';

import coinApiService from '../services/coin-api.service';
import Layout from '../components/layout.component';
import { Button, Card, Title, Paragraph, Caption, Appbar, DefaultTheme } from 'react-native-paper';
import { Coin } from '../models/coin.model';
import { User } from '../models/user.model';
import { selectCurrentUser } from '../redux/user/user.selectors';

interface IProps extends NavigationInjectedProps {
  currentUser: User;
  signOutLoading: boolean;
  signOutError: string | null;
  handleSignOut: () => void;
}

const HomeScreen: NavigationScreenComponent<any, IProps> = ({ navigation, currentUser }) => {
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
      {currentUser && <Title>Hi {currentUser.displayName} !</Title>}
      <Button onPress={() => navigation.navigate('coin')}>Go to coin</Button>
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

HomeScreen.navigationOptions = {
  title: 'Home',
  header: ({ scene, previous, navigation }) => {
    const { options } = scene.descriptor;
    const title =
      options.headerTitle !== undefined ? options.headerTitle : options.title !== undefined ? options.title : scene.route.routeName;
    return (
      <Appbar.Header style={{ backgroundColor: DefaultTheme.colors.primary }}>
        <Appbar.Content title={title} />
      </Appbar.Header>
    );
  },
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(HomeScreen);
