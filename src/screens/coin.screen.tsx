import React from 'react';
import { Text, View } from 'react-native';
import { NavigationScreenComponent, NavigationInjectedProps } from 'react-navigation';
import { Button, Appbar, DefaultTheme } from 'react-native-paper';
import Layout from '../components/layout.component';

interface IProps extends NavigationInjectedProps {}

const CoinScreen: NavigationScreenComponent<any, IProps> = ({ navigation }) => {
  return (
    <Layout>
      <Text>Coin view</Text>
      <Button onPress={() => navigation.navigate('coins')}>Go to main</Button>
    </Layout>
  );
};

CoinScreen.navigationOptions = {
  title: 'Coin',
  header: ({ scene, previous, navigation }) => {
    const backgroundColor = previous.descriptor.options.title === 'Home' ? DefaultTheme.colors.primary : DefaultTheme.colors.accent;
    const { options } = scene.descriptor;
    const title =
      options.headerTitle !== undefined ? options.headerTitle : options.title !== undefined ? options.title : scene.route.routeName;
    return (
      <Appbar.Header style={{ backgroundColor }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={title} />
      </Appbar.Header>
    );
  },
};

export default CoinScreen;
