import React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  style?: object;
}

const Layout: React.FC<IProps> = ({ children, style }) => {
  return <View style={[styles.layout, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20
  },
});

export default Layout;
