import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Text, View } from 'react-native';
import { NavigationInjectedProps, FlatList } from 'react-navigation';
import coinApiService from '../services/coin-api.service';
import Layout from '../components/layout.component';
import { Button, Card, Title, Paragraph, Caption, DefaultTheme, Avatar, IconButton, FAB } from 'react-native-paper';
import CoinList from '../components/coin-list.component';

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

  const [coins, setCoins] = useState<Coin[]>([]);

    useEffect(() => {
        const fetchCoinsDatas: any = async () => {
            try {
                const coinsResponse: any = await coinApiService.getCoins();
                setCoins(coinsResponse.data.coins);
            } catch (err) {
                console.log(err)
            }
        };
        fetchCoinsDatas();
    }, [])

  return (
    <Layout>
      <CoinList coins={coins}/>
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
