import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { ActivityIndicator, DefaultTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { auth, createUserProfileDocument } from '../services/firebase.service';
import { User } from '../models/user.model';
import { authSuccess } from '../redux/user/user.actions';

interface IProps extends NavigationInjectedProps {
  authSuccess: (currentUser: User) => void;
}

const LoadingScreen: React.FC<IProps> = ({ navigation, authSuccess }) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth: firebase.User | null) => {
      if (userAuth) {
        const currentUser: User = await createUserProfileDocument(userAuth);
        authSuccess(currentUser);
        navigation.navigate('main');
      } else {
        navigation.navigate('login');
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Icon size={120} name="currency-btc" color={DefaultTheme.colors.primary} style={{ marginBottom: 30 }} />
      <ActivityIndicator size="small" />
    </View>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  authSuccess: (currentUser: User) => dispatch(authSuccess(currentUser)),
});

export default connect(null, mapDispatchToProps)(LoadingScreen);
