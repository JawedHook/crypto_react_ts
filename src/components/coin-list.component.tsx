import React, { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Facebook } from 'react-content-loader/native'
import { Card, Button, DefaultTheme, FAB, Title, IconButton } from 'react-native-paper';

import { selectCurrentUser } from '../redux/user/user.selectors';
import coinApiService from '../services/coin-api.service';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';

import { Coin } from '../models/coin.model';
import { User } from '../models/user.model';

interface IProps extends NavigationInjectedProps {
    coins: Coin[];
    currentUser: User;
}

const CoinList: React.FC<IProps> = ({ children, coins, navigation, currentUser }) => {

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

    const headerComponent: any = () => {
        return currentUser ?
            <Title style={{ marginBottom: 15, paddingTop: 20 }}>Hi {currentUser.displayName} !</Title>
            : null
    }

    return (
        coins.length > 0 ?
            <FlatList
                style={{ paddingRight: 20 }}
                ListHeaderComponent={() => headerComponent()}
                data={coins}
                renderItem={(coinItem) => coinCard(coinItem)}
                keyExtractor={(item: Coin) => item.symbol}
            /> :
            <SkeletonLoader />
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(withNavigation(CoinList));