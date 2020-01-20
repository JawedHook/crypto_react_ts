import React from 'react';
import { Text } from 'react-native';
import { Card, DefaultTheme, Button } from 'react-native-paper';
import { createStructuredSelector } from 'reselect';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';

import { Coin, UserCoin } from '../models/coin.model';
import DeltaCoinCard from './delta-coin-card.component';
import { selectCurrentUser, selectCurrentUserCoins } from '../redux/user/user.selectors';
import { setUserCoin } from '../redux/user/user.actions';
import { User } from '../models/user.model';
import { firestore } from '../services/firebase.service';
import { addSavedCoin, removeSavedCoin } from '../redux/coins/coins.action';

interface IProps extends NavigationInjectedProps {
  coin: Coin;
  isPreview: boolean;
  fromHome: boolean;
  currentUser: User;
  setUserCoin: (currentUser: User) => void;
  currentUserCoins: UserCoin[];
  addSavedCoin: (coin: Coin) => void;
  removeSavedCoin: (symbol: string) => void;
}

interface ICoinDetailParams {
  fromHome: boolean;
  symbol: string;
  min?: number;
  max?: number;
}

const CoinCard: React.FC<IProps> = ({
  addSavedCoin,
  removeSavedCoin,
  navigation,
  coin,
  isPreview,
  fromHome,
  currentUser,
  setUserCoin,
  currentUserCoins,
}) => {
  const isLiked: boolean = !!currentUserCoins.find((currentUserCoin: UserCoin) => currentUserCoin.symbol === coin.symbol);

  const saveCoin = async (): Promise<void> => {
    const newUserCoins: UserCoin[] = [...currentUserCoins, { symbol: coin.symbol, min: 0, max: 0 }];
    const newUser: User = { ...currentUser, coins: newUserCoins };
    await firestore.doc(`users/${currentUser.id}`).update({ coins: newUserCoins });
    setUserCoin(newUser);
    const savedCoin = new Coin(coin);
    addSavedCoin(savedCoin);
  };

  const removeCoin = async (): Promise<void> => {
    const newUserCoins: UserCoin[] = currentUserCoins.filter((currentUserCoin: UserCoin) => currentUserCoin.symbol !== coin.symbol);
    const newUser: User = { ...currentUser, coins: newUserCoins };
    await firestore.doc(`users/${currentUser.id}`).update({ coins: newUserCoins });
    setUserCoin(newUser);
    removeSavedCoin(coin.symbol);
  };

  const openCoinDetail = (): void => {
    let params: ICoinDetailParams = { fromHome, symbol: coin.symbol };
    if (!fromHome) {
      params.min = coin.min;
      params.max = coin.max;
    }
    navigation.navigate('coin', params);
  };

  return (
    <Card style={{ marginBottom: 15 }}>
      <Card.Title title={coin.name} subtitle={coin.symbol} right={() => <DeltaCoinCard delta={coin.delta_24h} />} />
      {!isPreview && (
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
      )}
      <Card.Actions>
        <Button
          onPress={() => {
            isLiked ? removeCoin() : saveCoin();
          }}
          icon={isLiked ? 'heart' : 'heart-outline'}
          color={DefaultTheme.colors.notification}>
          Like
        </Button>
        {isPreview && (
          <Button icon="plus" color="black" onPress={openCoinDetail}>
            Details
          </Button>
        )}
        {!fromHome && !isPreview && (
          <Button icon="plus" color="black" onPress={() => console.log('SET MIN AND MAX')}>
            Min & Max
          </Button>
        )}
      </Card.Actions>
    </Card>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentUserCoins: selectCurrentUserCoins,
});

const mapDispatchToProps = (dispatch: any) => ({
  setUserCoin: (currentUser: User) => dispatch(setUserCoin(currentUser)),
  addSavedCoin: (coin: Coin) => dispatch(addSavedCoin(coin)),
  removeSavedCoin: (symbol: string) => dispatch(removeSavedCoin(symbol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CoinCard));
