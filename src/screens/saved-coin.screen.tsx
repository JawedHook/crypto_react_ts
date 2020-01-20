import React, { useEffect } from 'react';
import { NavigationScreenComponent, NavigationInjectedProps } from 'react-navigation';
import { Appbar, DefaultTheme, Title } from 'react-native-paper';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Layout from '../components/layout.component';
import CoinList from '../components/coin-list.component';
import { selectCurrentUserCoins } from '../redux/user/user.selectors';
import { UserCoin, Coin } from '../models/coin.model';
import { selectCoins, selectSavedCoins } from '../redux/coins/coins.selectors';
import { getSavedCoinsFromCoins } from '../redux/coins/coins.action';

interface IProps extends NavigationInjectedProps {
  currentUserCoins: UserCoin[];
  savedCoins: Coin[];
  getSavedCoinsFromCoins: (currentUserCoins: UserCoin[]) => void;
}

const SavedCoinScreen: NavigationScreenComponent<any, IProps> = ({ currentUserCoins, getSavedCoinsFromCoins, savedCoins }) => {
  useEffect(() => {
    getSavedCoinsFromCoins(currentUserCoins);
  }, []);

  const coinListHeader = (): JSX.Element => {
    return <Title style={{ marginBottom: 15, paddingTop: 20 }}>{currentUserCoins.length} coins saved !</Title>;
  };

  return (
    <Layout style={{ paddingTop: 0, paddingRight: 0 }}>
      <CoinList coins={savedCoins} fromHome={false} header={coinListHeader} />
    </Layout>
  );
};

SavedCoinScreen.navigationOptions = {
  title: 'Saved',
  header: ({ scene }) => {
    const { options } = scene.descriptor;
    const title =
      options.headerTitle !== undefined ? options.headerTitle : options.title !== undefined ? options.title : scene.route.routeName;
    return (
      <Appbar.Header style={{ backgroundColor: DefaultTheme.colors.accent }}>
        <Appbar.Content title={title} />
      </Appbar.Header>
    );
  },
};

const mapStateToProps = createStructuredSelector({
  currentUserCoins: selectCurrentUserCoins,
  coins: selectCoins,
  savedCoins: selectSavedCoins,
});

const mapDispatchToProps = (dispatch: any) => ({
  getSavedCoinsFromCoins: (currentUserCoins: UserCoin[]) => dispatch(getSavedCoinsFromCoins(currentUserCoins)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedCoinScreen);
