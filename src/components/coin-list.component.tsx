import React from 'react';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { Card, Button, DefaultTheme, IconButton } from 'react-native-paper';
import { FlatList } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { Coin, UserCoin } from '../models/coin.model';
import { setUserCoin } from '../redux/user/user.actions';
import { selectCurrentUser, selectCurrentUserCoins } from '../redux/user/user.selectors';
import { User } from '../models/user.model';
import { firestore } from '../services/firebase.service';
import Loader from './loader.component';
import { selectCoins } from '../redux/coins/coins.selectors';
import DeltaCoinCard from './delta-coin-card.component';

interface IProps extends NavigationInjectedProps {
  coins: Coin[];
  fromHome: boolean;
  currentUser: User;
  setUserCoin: (currentUser: User) => void;
  currentUserCoins: UserCoin[];
}

interface ICoinDetailParams {
  fromHome: boolean;
  symbol: string;
  min?: number;
  max?: number;
}

const CoinList: React.FC<IProps> = ({ coins, navigation, fromHome, currentUser, setUserCoin, currentUserCoins }) => {
  const openCoinDetail: any = (coin: Coin): void => {
    let params: ICoinDetailParams = { fromHome, symbol: coin.symbol };

    if (!fromHome) {
      params.min = coin.min;
      params.max = coin.max;
    }

    navigation.navigate('coin', params);
  };

  const saveCoin = async (coin: Coin): Promise<void> => {
    const userCoins: UserCoin[] = currentUser.coins;
    const exist = userCoins.find((userCoin: UserCoin) => userCoin.symbol === coin.symbol);
    if (exist) return;
    const newUserCoins: UserCoin[] = [...userCoins, { symbol: coin.symbol, min: 0, max: 0 }];
    const newUser: User = { ...currentUser, coins: newUserCoins };

    await firestore.doc(`users/${currentUser.id}`).update({ coins: newUserCoins });
    setUserCoin(newUser);
  };

  const isLiked = (symbol: string): boolean => {
    return !!currentUserCoins.find((currentUserCoin: UserCoin) => currentUserCoin.symbol === symbol);
  };

  const coinCard: any = (coinItem: any) => {
    const coin = new Coin(coinItem.item);
    return (
      <Card style={{ marginBottom: 15 }}>
        <Card.Title title={coin.name} subtitle={coin.symbol} right={() => <DeltaCoinCard delta={coin.delta_24h} />} />
        <Card.Actions>
          <Button
            onPress={() => saveCoin(coin)}
            icon={isLiked(coin.symbol) ? 'heart' : 'heart-outline'}
            color={DefaultTheme.colors.notification}>
            Like
          </Button>
          <Button icon="plus" color="black" onPress={() => openCoinDetail(coin)}>
            Details
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  return coins.length > 0 ? <FlatList data={coins} renderItem={coinCard} keyExtractor={(item: Coin) => item.symbol} /> : <Loader />;
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentUserCoins: selectCurrentUserCoins,
});

const mapDispatchToProps = (dispatch: any) => ({
  setUserCoin: (currentUser: User) => dispatch(setUserCoin(currentUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CoinList));
