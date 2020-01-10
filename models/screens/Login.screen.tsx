import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { Button, InputItem } from './node_modules/@ant-design/react-native';
import { NavigationInjectedProps } from './node_modules/react-navigation';

import { register, createUserProfileDocument } from '../../services/firebase.service';

const LoginScreen: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  const [displayName, setDisplayName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const { user } = await register(email, password);

      const userRef = await createUserProfileDocument(user, { displayName });

      const userDocumentSnapshot = await userRef?.get();

      console.log('currentUser:', { id: userDocumentSnapshot?.id, ...userDocumentSnapshot?.data() });
      navigation.navigate('main');
    } catch (err) {
      setFirebaseError(err.message || err.toString());
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Login view</Text>
        <Text>Name: {displayName}</Text>
        <Text>Email: {email}</Text>
        <Text>Password: {password}</Text>
        <InputItem value={displayName} onChange={setDisplayName} placeholder="Display Name" />
        <InputItem value={email} onChange={setEmail} placeholder="Email" />
        <InputItem value={password} onChange={setPassword} type="password" placeholder="Password" />
        <Button onPress={handleSubmit}>Register</Button>
        {firebaseError && <Text>{firebaseError}</Text>}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
