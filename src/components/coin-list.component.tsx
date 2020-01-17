import React from 'react';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { Card, Button, DefaultTheme, FAB, IconButton } from 'react-native-paper';
import { FlatList, Text } from 'react-native';

import { Facebook } from 'react-content-loader/native'

import { Coin } from '../models/coin.model';
import { setUserCoin } from '../redux/user/user.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../redux/user/user.selectors';
import { User } from '../models/user.model';

interface IProps extends NavigationInjectedProps {
    coins: Coin[];
    fromHome : boolean,
    currentUser : User,
    setUserCoin: (currentUser: User) => void
  }

const CoinList: React.FC<IProps> = ({ coins, navigation, fromHome, currentUser, setUserCoin }) => {

    const SkeletonLoader = () => <Facebook />

    const openCoinDetail: any = (symbol: string): void => {
        navigation.navigate('coin', {fromHome : fromHome, symbol });
    };

    const saveCoin = (coin: Coin): void => {
        const {name, symbol} = coin
        const savedCoin = new Coin({name, symbol, min:0, max:0})

        const userCoins = currentUser.coins;
        const savedCoins: Coin[] = [...userCoins, savedCoin]
        const newUser: User = {...currentUser, coins:savedCoins }
        setUserCoin(newUser);
    }

    const coinCard: any = (coinItem: any) => {
        const coin = new Coin(coinItem.item);
        return (
            <Card style={{ marginBottom: 15 }}>
                <Card.Title
                    title={coin.name} subtitle={coin.symbol}
                />
                <Card.Actions>
                    <IconButton onPress={() => saveCoin(coin)} icon='heart-outline' color={DefaultTheme.colors.notification} />
                    <Button onPress={() => openCoinDetail(coin.symbol)}>Details</Button>
                </Card.Actions>
            </Card>
        );
    };

    return (
        coins.length > 0 ?
            <FlatList
                data={coins}
                renderItem={(coinItem) => coinCard(coinItem)}
                keyExtractor={(item: Coin) => item.symbol}
            /> :
            <SkeletonLoader />
    )
}
const mapStateToProps = createStructuredSelector({
    currentUser : selectCurrentUser
});

const mapDispatchToProps = (dispatch: any) => ({
    setUserCoin: (currentUser: User) => dispatch(setUserCoin(currentUser))
})
  
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CoinList));
