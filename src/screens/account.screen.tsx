import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationScreenComponent, NavigationInjectedProps } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Appbar, DefaultTheme, ActivityIndicator, Title, Subheading, Caption, Divider, Switch } from 'react-native-paper';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import { selectCurrentUser, selectSignOutLoading, selectSignOutError } from '../redux/user/user.selectors';
import { handleSignOut } from '../redux/user/user.actions';
import { User } from '../models/user.model';
import Layout from '../components/layout.component';

interface IProps extends NavigationInjectedProps {
  currentUser: User;
  signOutLoading: boolean;
  signOutError: string | null;
  handleSignOut: () => void;
}

const AccountScreen: NavigationScreenComponent<any, IProps> = ({ currentUser, signOutLoading, signOutError, handleSignOut }) => {
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);

  return (
    <>
      <Appbar.Header style={{ backgroundColor: DefaultTheme.colors.notification }}>
        <Appbar.Content title="Account" />
        {signOutLoading ? (
          <ActivityIndicator style={{ marginRight: 15 }} size="small" color="white" />
        ) : (
          <Appbar.Action size={20} icon="logout" onPress={handleSignOut} />
        )}
      </Appbar.Header>
      {currentUser && (
        <Layout>
          <Title>{currentUser.displayName}</Title>
          <Subheading>{currentUser.email}</Subheading>
          <Caption>Created {formatDistanceToNow(currentUser.createdAt)} ago</Caption>
          <Divider style={styles.divider} />
          <Subheading style={styles.isSwitchOnTitle}>Use touchID</Subheading>
          <Switch value={isSwitchOn} onValueChange={() => setIsSwitchOn(!isSwitchOn)} />
        </Layout>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  divider: {
    marginVertical: 20,
  },
  isSwitchOnTitle: {
    marginBottom: 10,
  },
});

AccountScreen.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ tintColor }) => <Icon color={tintColor} size={25} name={'account'} />,
  tabBarColor: DefaultTheme.colors.notification,
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  signOutLoading: selectSignOutLoading,
  signOutError: selectSignOutError,
});

const mapDispatchToProps = (dispatch: any) => ({
  handleSignOut: () => dispatch(handleSignOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
