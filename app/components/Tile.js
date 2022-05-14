import React from 'react';
import {View, TouchableNativeFeedback, StyleSheet} from 'react-native'

import AppText from './AppText';

const Tile = props => {
  const handlePress = () => {
    props.onClick(props.id);
  };

  return (
    <TouchableNativeFeedback onPress={handlePress}>
      <View style={[cardStyles.card, props.showData ? cardStyles.show : {}]}>
        {props.showData && <AppText>{props.value}</AppText>}
      </View>
    </TouchableNativeFeedback>
  );
};

const cardStyles = StyleSheet.create({
  card: {
    height: 140,
    width: 100,
    borderRadius: 8,
    backgroundColor: '#fa8100',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  show: {
    backgroundColor: '#f5b6da',
  },
});

export default Tile