import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, StyleSheet } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

import { handleSignUp } from '../redux/user/user.actions';
import { selectSignUpError, selectSignUpLoading } from '../redux/user/user.selectors';
import Layout from './layout.component';

interface IProps {
  signUpError: string | null;
  signUpLoading: boolean;
  handleSignUp: (displayName: string, email: string, password: string) => void;
}

const SignUp: React.FC<IProps> = ({ signUpError, signUpLoading, handleSignUp }) => {
  const [displayName, setDisplayName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const hasEmailError = (): boolean => !email.includes('@') && email.length !== 0;
  const hasPasswordError = (): boolean => password.length < 6 && password.length !== 0;

  return (
    <Layout>
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
        {hasPasswordError() && <HelperText type="error">Password to short !</HelperText>}
      </View>
      <Button
        icon="account"
        loading={signUpLoading}
        disabled={signUpLoading}
        mode="contained"
        onPress={() => handleSignUp(displayName, email, password)}>
        Signup
      </Button>
      {signUpError && (
        <HelperText style={styles.error} type="error">
          {signUpError}
        </HelperText>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
  error: {
    marginTop: 10,
    textAlign: 'center',
  },
});

const mapStateToProps = createStructuredSelector({
  signUpError: selectSignUpError,
  signUpLoading: selectSignUpLoading,
});

const mapDispatchToProps = (dispatch: any) => ({
  handleSignUp: (displayName: string, email: string, password: string) => dispatch(handleSignUp(displayName, email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
