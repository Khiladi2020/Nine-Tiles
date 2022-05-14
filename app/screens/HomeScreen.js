import React, {useState} from 'react';
import {View, StyleSheet, Alert, Button, ToastAndroid} from 'react-native';

import AppScreen from '../components/AppScreen';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';

const HomeScreen = props => {
  const startGame = () => {
    props.startGame();
  };

  return (
    <AppScreen style={styles.container}>
      <View style={styles.form}>
        <View style={styles.main}>
          <View>
            <AppText style={styles.heading}>Select number</AppText>
          </View>
          <View style={styles.inputs}>
            <AppButton
              title=" ADD "
              onPress={props.increaseCount}
              disabled={props.guessNumber === 9}
            />
            <AppText style={styles.guessText}>{props.guessNumber}</AppText>
            <AppButton
              title=" DEC "
              onPress={props.decreaseCount}
              disabled={props.guessNumber === 1}
            />
          </View>
        </View>
        <AppButton title="Start Game" onPress={props.startGame} />
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  main: {
    height: '70%',
    width: '100%',
    alignItems: 'center',
  },
  inputs: {
    width: '100%',
    paddingTop: 40,
    // backgroundColor:'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  form: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  guessText: {
    fontSize: 150,
  },
});

export default HomeScreen;
