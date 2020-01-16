import React from 'react';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { Card, Button, DefaultTheme, FAB, IconButton } from 'react-native-paper';
import { FlatList, Text } from 'react-native';

import { Facebook } from 'react-content-loader/native'

import { Coin } from '../models/coin.model';

interface IProps extends NavigationInjectedProps {
    coins: Coin[];
  }

const CoinList: React.FC<IProps> = ({ children, coins, navigation }) => {

    const SkeletonLoader = () => <Facebook />

    const openCoinDetail: any = (symbol: string) => {
        navigation.navigate('coin');
    };

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

    const coinCard: any = (coinItem: any) => {
        const coin = new Coin(coinItem.item);
        return (
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

export default  withNavigation(CoinList);