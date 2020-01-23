import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { NavigationScreenComponent } from 'react-navigation';
import { DefaultTheme, Appbar, Title } from 'react-native-paper';

import coinApiService from '../services/coin-api.service';
import Layout from '../components/layout.component';
import CoinList from '../components/coin-list.component';
import { Coin } from '../models/coin.model';
import { User } from '../models/user.model';
import { selectCurrentUser } from '../redux/user/user.selectors';
import { setCoins } from '../redux/coins/coins.action';
import { selectCoins } from '../redux/coins/coins.selectors';
import notificationsService from '../services/notifications.service';

interface IProps {
  currentUser: User;
  setCoins: (coins: Coin[]) => void;
  coins: Coin[];
}

const HomeScreen: NavigationScreenComponent<any, IProps> = ({ currentUser, setCoins, coins }) => {
  useEffect(() => {
    notificationsService.checkNotificationsPerm(currentUser);
    const fetchCoinsDatas: any = async () => {
      try {
        const coinsResponse: any = await coinApiService.getCoins();
        setCoins(coinsResponse.data.coins);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCoinsDatas();
  }, []);

  const coinListHeader = (): JSX.Element => {
    return currentUser ? <Title style={{ marginBottom: 15, paddingTop: 20 }}>Hi {currentUser.displayName} !</Title> : null;
  };

  return (
    <Layout style={{ paddingTop: 0, paddingRight: 0 }}>
      <CoinList coins={coins} fromHome header={coinListHeader} />
    </Layout>
  );
};

HomeScreen.navigationOptions = {
  title: 'Home',
  header: ({ scene }) => {
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
  coins: selectCoins,
});

const mapDispatchToProps = (dispatch: any) => ({
  setCoins: (coins: Coin[]) => dispatch(setCoins(coins)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
