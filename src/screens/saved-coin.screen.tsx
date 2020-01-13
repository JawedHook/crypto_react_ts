import React from 'react';
import { Text, View } from 'react-native';
import { NavigationScreenComponent, NavigationInjectedProps } from 'react-navigation';
import { Appbar, DefaultTheme, Button } from 'react-native-paper';

import Layout from '../components/layout.component';

interface IProps extends NavigationInjectedProps {}

const SavedCoinScreen: NavigationScreenComponent<any, IProps> = ({ navigation }) => {
  return (
    <Layout>
      <Text>Saved coin view</Text>
      <Button onPress={() => navigation.navigate('coin')}>Go to coin</Button>
    </Layout>
  );
};

SavedCoinScreen.navigationOptions = {
  title: 'Saved',
  header: ({ scene, previous, navigation }) => {
    const { options } = scene.descriptor;
    const title =
      options.headerTitle !== undefined ? options.headerTitle : options.title !== undefined ? options.title : scene.route.routeName;
    return (
      <Appbar.Header style={{ backgroundColor: DefaultTheme.colors.accent }}>
        <Appbar.Content title={title} />
      </Appbar.Header>
    );
  },
};

export default SavedCoinScreen;
