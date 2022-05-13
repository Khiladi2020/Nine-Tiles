import React from 'react';
import {View, StyleSheet} from 'react-native';

const AppScreen = props => {
  return <View style={[styles.screen, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor:'#f2fde4'
  },
});

export default AppScreen;
