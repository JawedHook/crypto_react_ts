import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText, Button, Divider, DefaultTheme } from 'react-native-paper';

import { handleSignIn, handleSignInWithGoogle } from '../redux/user/user.actions';
import { selectSignInError, selectSignInLoading, selectSignInWithGoogleLoading } from '../redux/user/user.selectors';
import Layout from './layout.component';

interface IProps {
  signInError: string | null;
  signInLoading: boolean;
  signInWithGoogleLoading: boolean;
  handleSignIn: (email: string, password: string) => void;
  handleSignInWithGoogle: () => void;
}

const SignIn: React.FC<IProps> = ({ handleSignIn, handleSignInWithGoogle, signInError, signInLoading, signInWithGoogleLoading }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const hasEmailError = (): boolean => !email.includes('@') && email.length !== 0;
  const hasPasswordError = (): boolean => password.length < 6 && password.length !== 0;

  return (
    <Layout>
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
      <Button
        icon="login"
        loading={signInLoading}
        disabled={signInLoading || signInWithGoogleLoading}
        mode="contained"
        onPress={() => handleSignIn(email, password)}>
        Signin
      </Button>
      <Divider style={styles.divider} />
      <Button
        loading={signInWithGoogleLoading}
        disabled={signInWithGoogleLoading || signInLoading}
        icon="google"
        mode="contained"
        color={DefaultTheme.colors.accent}
        onPress={handleSignInWithGoogle}>
        Signin with google
      </Button>
      {signInError && (
        <HelperText style={styles.error} type="error">
          {signInError}
        </HelperText>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  divider: {
    marginVertical: 20,
  },
  input: {
    marginBottom: 20,
  },
  error: {
    marginTop: 10,
    textAlign: 'center',
  },
});

const mapStateToProps = createStructuredSelector({
  signInError: selectSignInError,
  signInLoading: selectSignInLoading,
  signInWithGoogleLoading: selectSignInWithGoogleLoading,
});

const mapDispatchToProps = (dispatch: any) => ({
  handleSignIn: (email: string, password: string) => dispatch(handleSignIn(email, password)),
  handleSignInWithGoogle: () => dispatch(handleSignInWithGoogle()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
