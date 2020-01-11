import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { TextInput, HelperText, Button, Divider } from 'react-native-paper';

import { login, createUserProfileDocument, signInWithGoole } from '../services/firebase.service';

const SignIn: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [withGoogleLoading, setWithGoogleLoading] = useState<boolean>(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      const { user } = await login(email, password);

      const userRef = await createUserProfileDocument(user);

      const userDocumentSnapshot = await userRef?.get();

      console.log('currentUser:', { id: userDocumentSnapshot?.id, ...userDocumentSnapshot?.data() });
      setSubmitLoading(false);
      navigation.navigate('main');
    } catch (err) {
      setSubmitLoading(false);
      setFirebaseError(err.message || err.toString());
    }
  };

  const handleWithGoogle = async () => {
    try {
      setWithGoogleLoading(true);
      const { user } = await signInWithGoole();

      const userRef = await createUserProfileDocument(user);

      const userDocumentSnapshot = await userRef?.get();

      console.log('currentUser:', { id: userDocumentSnapshot?.id, ...userDocumentSnapshot?.data() });
      setWithGoogleLoading(false);
      navigation.navigate('main');
    } catch (err) {
      setWithGoogleLoading(false);
      setFirebaseError(err.message || err.toString());
    }
  };

  const hasEmailError = (): boolean => !email.includes('@') && email.length !== 0;
  const hasPasswordError = (): boolean => password.length < 6 && password.length !== 0;

  return (
    <View>
      <View style={styles.input}>
        <TextInput label="Email" error={hasEmailError()} placeholder="Your Email" value={email} onChangeText={setEmail} />
        {hasEmailError() && <HelperText type="error">Email address is invalid !</HelperText>}
      </View>
      <View style={styles.input}>
        <TextInput
          label="Password"
          error={hasPasswordError()}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Your Password"
        />
        {hasPasswordError() && <HelperText type="error">Password to short !</HelperText>}
      </View>
      <Button loading={submitLoading} mode="contained" onPress={handleSubmit}>
        Signin
      </Button>
      <Divider style={styles.divider} />
      <Button loading={withGoogleLoading} icon="camera" mode="contained" onPress={handleWithGoogle}>
        Signin with google
      </Button>
      {firebaseError && <Text>{firebaseError}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    marginVertical: 20,
  },
  input: {
    marginBottom: 20,
  },
});

export default withNavigation(SignIn);
