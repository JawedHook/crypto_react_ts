import React from 'react';
import { Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import Layout from '../components/layout.component';
import SignIn from '../components/sign-in.component';
import SignUp from '../components/sign-up.component';

interface ILoginRoutes {
  key: string;
  title: string;
}

const LoginScreen: React.FC = () => {
  const [index, setIndex] = React.useState<number>(0);
  const [routes] = React.useState<ILoginRoutes[]>([
    { key: 'signin', title: 'Sign in' },
    { key: 'signup', title: 'Sign up' },
  ]);

  const initialLayout: { width: number } = { width: Dimensions.get('window').width };

  const renderScene: any = SceneMap({
    signin: SignIn,
    signup: SignUp,
  });

  return (
    <Layout>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </Layout>
  );
};

export default LoginScreen;
