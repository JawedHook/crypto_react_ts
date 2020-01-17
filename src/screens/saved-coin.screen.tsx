import React from 'react';
import { Text, View } from 'react-native';
import { NavigationScreenComponent, NavigationInjectedProps } from 'react-navigation';
import { Appbar, DefaultTheme, Button } from 'react-native-paper';

import Layout from '../components/layout.component';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../redux/user/user.selectors';
import { connect } from 'react-redux';
import { User } from '../models/user.model';

interface IProps extends NavigationInjectedProps {
  currentUser : User
}

const SavedCoinScreen: NavigationScreenComponent<any, IProps> = ({ navigation, currentUser }) => {
  console.log(currentUser.coins)
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

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser
});

export default connect(mapStateToProps)(SavedCoinScreen);
