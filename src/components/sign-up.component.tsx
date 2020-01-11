import React, { useState } from 'react';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { View, Text, StyleSheet } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

import { register, createUserProfileDocument } from '../services/firebase.service';

const SignUp: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  const [displayName, setDisplayName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      const { user } = await register(email, password);

      const userRef = await createUserProfileDocument(user, { displayName });

      const userDocumentSnapshot = await userRef?.get();

      console.log('currentUser:', { id: userDocumentSnapshot?.id, ...userDocumentSnapshot?.data() });
      setSubmitLoading(false);
      navigation.navigate('main');
    } catch (err) {
      setSubmitLoading(false);
      setFirebaseError(err.message || err.toString());
    }
  };

  const hasEmailError = (): boolean => !email.includes('@') && email.length !== 0;
  const hasPasswordError = (): boolean => password.length < 6 && password.length !== 0;

  return (
    <View>
      <TextInput style={styles.input} label="Display Name" placeholder="Your Name" value={displayName} onChangeText={setDisplayName} />
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
        {hasPasswordError() && (
          <HelperText type="error" visible={hasPasswordError()}>
            Password to short !
          </HelperText>
        )}
      </View>
      <Button loading={submitLoading} mode="contained" onPress={handleSubmit}>
        Signup
      </Button>
      {firebaseError && <Text>{firebaseError}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
});

export default withNavigation(SignUp);
