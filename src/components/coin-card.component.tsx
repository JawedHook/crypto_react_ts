import React, { useState } from 'react';
import { Card, DefaultTheme, Button, Paragraph, Portal, Dialog, Subheading, Caption, Title } from 'react-native-paper';
import { createStructuredSelector } from 'reselect';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';
import NumericInput from 'react-native-numeric-input';

import { Coin, UserCoin } from '../models/coin.model';
import DeltaCoinCard from './delta-coin-card.component';
import { selectCurrentUser, selectCurrentUserCoins } from '../redux/user/user.selectors';
import { updateUserCoins } from '../redux/user/user.actions';
import { User } from '../models/user.model';
import { addSavedCoin, removeSavedCoin, updateSavedCoin } from '../redux/coins/coins.action';

interface IProps extends NavigationInjectedProps {
  coin: Coin;
  isPreview: boolean;
  fromHome: boolean;
  currentUser: User;
  updateUserCoins: (currentUser: User, newUserCoins: UserCoin[]) => void;
  currentUserCoins: UserCoin[];
  addSavedCoin: (coin: Coin) => void;
  removeSavedCoin: (symbol: string) => void;
  updateSavedCoin: (userCoin: UserCoin) => void;
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
  updateUserCoins,
  currentUserCoins,
  updateSavedCoin,
}) => {
  const [min, setMin] = useState<number>(coin.min);
  const [max, setMax] = useState<number>(coin.max);
  const [prevMin, setPrevMin] = useState<number>(coin.min);
  const [prevMax, setPrevMax] = useState<number>(coin.max);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const isLiked: boolean = !!currentUserCoins.find((currentUserCoin: UserCoin) => currentUserCoin.symbol === coin.symbol);

  const setPriceRange = async () => {
    const newUserCoins: UserCoin[] = currentUserCoins.map((currentUserCoin: UserCoin) => {
      if (currentUserCoin.symbol === coin.symbol) {
        currentUserCoin.min = min;
        currentUserCoin.max = max;
      }
      return currentUserCoin;
    });
    updateUserCoins(currentUser, newUserCoins);
    updateSavedCoin({ symbol: coin.symbol, min, max });
  };

  const saveCoin = async (): Promise<void> => {
    const newUserCoins: UserCoin[] = [...currentUserCoins, { symbol: coin.symbol, min: 0, max: 0 }];
    updateUserCoins(currentUser, newUserCoins);
    const savedCoin = new Coin(coin);
    addSavedCoin(savedCoin);
  };

  const removeCoin = async (): Promise<void> => {
    const newUserCoins: UserCoin[] = currentUserCoins.filter((currentUserCoin: UserCoin) => currentUserCoin.symbol !== coin.symbol);
    updateUserCoins(currentUser, newUserCoins);
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
    <>
      <Card style={{ marginBottom: 15 }}>
        <Card.Title title={coin.name} subtitle={coin.symbol} right={() => <DeltaCoinCard delta={coin.delta_24h} />} />
        {!isPreview && (
          <Card.Content>
            <Paragraph>Price: {coin.price.split('.')[0]}€</Paragraph>
            <Paragraph>Delta: {coin.delta_24h}% last 24h</Paragraph>
            <Paragraph>Rank: #{coin.rank}</Paragraph>
            {!fromHome && (
              <>
                <Paragraph>Min: {min}</Paragraph>
                <Paragraph>Max: {max}</Paragraph>
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
            <Button icon="plus" color="black" onPress={() => setModalVisible(true)}>
              price range
            </Button>
          )}
        </Card.Actions>
      </Card>
      <Portal>
        <Dialog visible={modalVisible} style={{ alignItems: 'center' }}>
          <Dialog.Title>
            <Title>Set a price range</Title>
            <Caption style={{ color: DefaultTheme.colors.primary }}> ({coin.price.split('.')[0]}€)</Caption>
          </Dialog.Title>
          <Dialog.Content style={{ alignItems: 'center' }}>
            <Subheading>Min : {min}</Subheading>
            <NumericInput
              value={min}
              maxValue={max}
              onChange={value => {
                setMin(value);
              }}
            />
            <Subheading style={{ marginTop: 10 }}>Max : {max}</Subheading>
            <NumericInput
              value={max}
              minValue={min}
              onChange={value => {
                setMax(value);
              }}
            />
          </Dialog.Content>
          <Dialog.Actions style={{ marginBottom: 20 }}>
            <Button
              style={{ marginRight: 15 }}
              icon="check"
              mode="contained"
              onPress={async () => {
                setPriceRange();
                setPrevMin(min);
                setPrevMax(max);
                setModalVisible(false);
              }}>
              Ok
            </Button>
            <Button
              icon="cancel"
              mode="contained"
              onPress={async () => {
                setMin(prevMin);
                setMax(prevMax);
                setModalVisible(false);
              }}>
              Cancel
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentUserCoins: selectCurrentUserCoins,
});

const mapDispatchToProps = (dispatch: any) => ({
  addSavedCoin: (coin: Coin) => dispatch(addSavedCoin(coin)),
  removeSavedCoin: (symbol: string) => dispatch(removeSavedCoin(symbol)),
  updateSavedCoin: (userCoin: UserCoin) => dispatch(updateSavedCoin(userCoin)),
  updateUserCoins: (currentUser: User, newUserCoins: UserCoin[]) => dispatch(updateUserCoins(currentUser, newUserCoins)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CoinCard));
