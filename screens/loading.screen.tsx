import React, { useEffect } from 'react';
import { View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { ActivityIndicator } from '@ant-design/react-native';

import { auth, createUserProfileDocument } from '../services/firebase.service';

const LoadingScreen: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth: firebase.User | null) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        const userDocumentSnapshot = await userRef?.get();
        console.log('currentUser:', { id: userDocumentSnapshot?.id, ...userDocumentSnapshot?.data() });
        navigation.navigate('main');
      } else {
        navigation.navigate('login');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="purple" />
    </View>
  );
};

export default LoadingScreen;
