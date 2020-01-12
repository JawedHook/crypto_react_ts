import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';

import coinApiService from '../services/coin-api.service';
import Layout from '../components/layout.component';
import { Button, Card, Title, Paragraph, Caption } from 'react-native-paper';
import { Coin } from '../models/coin.model';
import { User } from '../models/user.model';
import { selectCurrentUser, selectSignOutLoading, selectSignOutError } from '../redux/user/user.selectors';
import { handleSignOut } from '../redux/user/user.actions';

interface IProps extends NavigationInjectedProps {
  currentUser: User;
  signOutLoading: boolean;
  signOutError: string | null;
  handleSignOut: () => void;
}

const HomeScreen: React.FC<IProps> = ({ navigation, currentUser, signOutLoading, signOutError, handleSignOut }) => {
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
      <Button icon="logout" loading={signOutLoading} disabled={signOutLoading} mode="contained" onPress={handleSignOut}>
        Logout
      </Button>
      {signOutError && <Text style={{ color: 'red' }}>{signOutError}</Text>}
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

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  signOutLoading: selectSignOutLoading,
  signOutError: selectSignOutError,
});

const mapDispatchToProps = (dispatch: any) => ({
  handleSignOut: () => dispatch(handleSignOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
