import React from 'react';
import {Text, StyleSheet} from 'react-native';

const AppText = props => {
  return <Text style={[styles.text, props.style]}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color:'#555555'
  },
});

export default AppText;
