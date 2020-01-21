import React from 'react';
import { TabView, SceneMap, NavigationState, SceneRendererProps, TabBar } from 'react-native-tab-view';
import { Subheading, DefaultTheme } from 'react-native-paper';

import SignIn from '../components/sign-in.component';
import SignUp from '../components/sign-up.component';
import { useSafeArea } from 'react-native-safe-area-context';
import { IRoutes } from '../interfaces/routes.interface';

type State = NavigationState<IRoutes>;

const LoginScreen: React.FC = () => {
  const [index, setIndex] = React.useState<number>(0);
  const [routes] = React.useState<IRoutes[]>([
    { key: 'signin', title: 'Sign in' },
    { key: 'signup', title: 'Sign up' },
  ]);

  const insets = useSafeArea();

  const renderLabel = ({ route }: { route: IRoutes; color: string }) => (
    <Subheading style={{ color: DefaultTheme.colors.accent }}>{route.title}</Subheading>
  );

  const renderTabBar = (props: SceneRendererProps & { navigationState: State }) => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{
          backgroundColor: DefaultTheme.colors.accent,
        }}
        renderLabel={renderLabel}
        style={{ backgroundColor: DefaultTheme.colors.primary, paddingTop: insets.top }}
      />
    );
  };

  const renderScene: any = SceneMap({
    signin: SignIn,
    signup: SignUp,
  });

  return (
    <TabView lazy navigationState={{ index, routes }} renderTabBar={renderTabBar} renderScene={renderScene} onIndexChange={setIndex} />
  );
};

export default LoginScreen;
