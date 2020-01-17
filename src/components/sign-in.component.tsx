import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, StyleSheet, Platform } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { TextInput, HelperText, Button, Divider, DefaultTheme, Portal, Dialog, IconButton } from 'react-native-paper';

import { handleSignIn, handleSignInWithGoogle, handleSignInWithTouchId, signInFailed } from '../redux/user/user.actions';
import {
  selectSignInError,
  selectSignInLoading,
  selectSignInWithGoogleLoading,
  selectSignInWithTouchIdLoading,
} from '../redux/user/user.selectors';
import Layout from './layout.component';
import { getStorageUseTouchId } from '../services/storage.service';

interface IProps {
  signInError: string | null;
  signInLoading: boolean;
  signInWithGoogleLoading: boolean;
  signInWithTouchIdLoading: boolean;
  handleSignIn: (email: string, password: string) => void;
  handleSignInWithGoogle: () => void;
  handleSignInWithTouchId: () => void;
  signInFailed: (err: string) => void;
}

const SignIn: React.FC<IProps> = ({
  handleSignIn,
  handleSignInWithGoogle,
  signInWithTouchIdLoading,
  signInError,
  signInLoading,
  signInWithGoogleLoading,
  handleSignInWithTouchId,
  signInFailed
}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [useTouchId, setUseTouchId] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [failedCount, setFailedCount] = useState<number>(0);

  useEffect(() => {
    const asyncEffect = async (): Promise<void> => {
      const storageUseTouchId = await getStorageUseTouchId();
      setUseTouchId(storageUseTouchId);
    };

    asyncEffect();
  }, []);

  const clickSignInWithTouchId = () => {
    setFailedCount(0);
    if (Platform.OS === 'android') {
      setModalVisible(true);
      scanFingerPrint();
    } else {
      scanFingerPrint();
    }
  };

  const scanFingerPrint = async () => {
    try {
      let results: LocalAuthentication.LocalAuthenticationResult = await LocalAuthentication.authenticateAsync();
      if (results.success) {
        setModalVisible(false);
        setFailedCount(0);
        handleSignInWithTouchId();
      } else {
        setFailedCount((prevCount: number) => prevCount + 1);
      }
    } catch (err) {
      signInFailed(err.message || err.toString());
    }
  };

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
      {signInError && (
        <HelperText style={styles.error} type="error">
          {signInError}
        </HelperText>
      )}
      <Button
        icon="login"
        loading={signInLoading}
        disabled={signInLoading || signInWithGoogleLoading || signInWithTouchIdLoading}
        mode="contained"
        onPress={() => handleSignIn(email, password)}>
        Signin
      </Button>
      <Divider style={styles.divider} />
      <Button
        loading={signInWithGoogleLoading}
        disabled={signInWithGoogleLoading || signInLoading || signInWithTouchIdLoading}
        icon="google"
        mode="contained"
        color={DefaultTheme.colors.accent}
        onPress={handleSignInWithGoogle}>
        Signin with google
      </Button>
      {useTouchId && (
        <>
          <Divider style={styles.divider} />
          <Button
            loading={signInWithTouchIdLoading}
            disabled={signInWithGoogleLoading || signInLoading || signInWithTouchIdLoading}
            icon="fingerprint"
            color={DefaultTheme.colors.notification}
            onPress={clickSignInWithTouchId}>
            Signin with touch ID
          </Button>
        </>
      )}
      <Portal>
        <Dialog visible={modalVisible} style={{ alignItems: 'center' }}>
          <Dialog.Title>Sign in with your touch ID</Dialog.Title>
          <Dialog.Content>
            <IconButton icon="fingerprint" color={DefaultTheme.colors.primary} size={100} />
            <HelperText style={{ textAlign: 'center' }} type="error" visible={failedCount > 0}>
              Failed !
            </HelperText>
          </Dialog.Content>
          <Dialog.Actions style={{ marginBottom: 20 }}>
            <Button
              icon="cancel"
              mode="contained"
              onPress={async () => {
                LocalAuthentication.cancelAuthenticate();
                setModalVisible(false);
              }}>
              Cancel
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
    marginBottom: 10,
    textAlign: 'center',
  },
});

const mapStateToProps = createStructuredSelector({
  signInError: selectSignInError,
  signInLoading: selectSignInLoading,
  signInWithGoogleLoading: selectSignInWithGoogleLoading,
  signInWithTouchIdLoading: selectSignInWithTouchIdLoading,
});

const mapDispatchToProps = (dispatch: any) => ({
  handleSignIn: (email: string, password: string) => dispatch(handleSignIn(email, password)),
  handleSignInWithGoogle: () => dispatch(handleSignInWithGoogle()),
  handleSignInWithTouchId: () => dispatch(handleSignInWithTouchId()),
  signInFailed: (err: string) => dispatch(signInFailed(err)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
