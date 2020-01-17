import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
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
import { setStorageUseTouchId } from '../services/storage.service';
import { firestore } from '../services/firebase.service';
import notificationsService from '../services/notifications.service';

interface IProps extends NavigationInjectedProps {
  currentUser: User;
  signOutLoading: boolean;
  signOutError: string | null;
  handleSignOut: () => void;
}

const AccountScreen: NavigationScreenComponent<any, IProps> = ({ currentUser, signOutLoading, signOutError, handleSignOut }) => {
  const [useTouchId, setUseTouchId] = useState<boolean>(currentUser ?.useTouchId);
  const [usePhoneToken, setPhoneToken] = useState<boolean>(currentUser ?.phoneToken);
  const [useTouchIdLoading, setUseTouchIdLoading] = useState<boolean>(false);
  const [usePhoneTokenLoading, setUsePhoneTokenLoading] = useState<boolean>(false);

  const handleSwitchUseTouchId = async (newValue: boolean): Promise<void> => {
    try {
      if (useTouchIdLoading) return;
      setUseTouchIdLoading(true);
      setUseTouchId(newValue);
      await firestore.doc(`users/${currentUser.id}`).update({ useTouchId: newValue });
      await setStorageUseTouchId(newValue);
      setUseTouchIdLoading(false);
    } catch (err) {
      Alert.alert(
        'An error has occured',
        'Cannot set Touch ID',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'Retry', onPress: () => handleSwitchUseTouchId(newValue) },
        ],
        { cancelable: false },
      );
      setUseTouchId(!newValue);
    }
  };

  const handleSwitchPhoneToken = async (newValue: boolean): Promise<void> => {
    try {
      if (usePhoneTokenLoading) return;
      setUsePhoneTokenLoading(true);
      setPhoneToken(newValue)
      newValue ? await notificationsService.setPhoneToken(currentUser.id) : await notificationsService.removePhoneToken(currentUser.id)
      setUsePhoneTokenLoading(false);
    } catch (err) {
      Alert.alert(
        'Cannot reach server',
        'Could not activate notifications',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'Retry', onPress: () => handleSwitchPhoneToken(newValue) },
        ],
        { cancelable: false },
        );
        setPhoneToken(!newValue)
      }
  }

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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Subheading style={styles.isSwitchOnTitle}>Use touchID</Subheading>
            <Switch value={useTouchId} onValueChange={handleSwitchUseTouchId} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Subheading style={styles.isSwitchOnTitle}>Authorize notifications</Subheading>
            <Switch value={usePhoneToken} onValueChange={handleSwitchPhoneToken} />
          </View>
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
