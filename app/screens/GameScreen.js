import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableNativeFeedback, Alert} from 'react-native';

import AppButton from '../components/AppButton';
import AppScreen from '../components/AppScreen';
import AppText from '../components/AppText';
import Tile from '../components/Tile';

const getStatusMessage = gameStatus => {
  let status_msg;

  if (gameStatus === 'PROGRESS') status_msg = 'Game is in Progress';
  else if (gameStatus === 'WIN') status_msg = '🎉 You have won! 🥳';
  else status_msg = '😞 You have lost!';

  return status_msg;
};

const GameScreen = props => {
  const status_msg = getStatusMessage(props.gameStatus);

  return (
    <AppScreen>
      <View style={styles.backNavigation}>
        <AppButton title="Go Back" onPress={() => props.changeScreen('HOME')} />
        <View style={styles.revealCard}>
          {props.gameStatus != 'PROGRESS' && (
            <AppButton title="Reveal Cards" onPress={props.revealAllTiles} />
          )}
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.statusView}>
          <AppText style={styles.statusMessage}>{status_msg}</AppText>
        </View>
        <View style={styles.gameStats}>
          <AppText>Guess: {props.guessNumber}</AppText>
          <AppText>Lives: {props.livesRemaining}</AppText>
        </View>
        <View style={styles.tiles}>
          {props.tiles.map(ele => (
            <Tile
              key={ele.id}
              id={ele.id}
              title={ele.title}
              value={ele.value}
              showData={ele.revealed}
              onClick={props.onTileClick}
            />
          ))}
        </View>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  backNavigation: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  revealCard: {
    flex: 1,
    alignItems: 'flex-end',
  },
  statusView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusMessage: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  gameStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 15,
  },
  main: {
    flex: 1,
  },
  tiles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 25,
  },
});

export default GameScreen;
