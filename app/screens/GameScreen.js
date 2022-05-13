import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableNativeFeedback, Alert} from 'react-native';
import AppButton from '../components/AppButton';
import AppScreen from '../components/AppScreen';
import AppText from '../components/AppText';

const Card = props => {
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

const GameScreen = props => {
  return (
    <AppScreen style={styles.container}>
      <View style={styles.backNavigation}>
        <AppButton title="Go Back" onPress={() => props.changeScreen('HOME')} />
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          {props.gameStatus != 'PENDING' && (
            <AppButton title="Reveal Cards" onPress={props.revealAllCards} />
          )}
        </View>
        {/* <View style={{flex:1}}/> */}
      </View>
      <View style={styles.main}>
        <View style={{paddingVertical: 30, flex: 1, justifyContent: 'center'}}>
          {['WON', 'LOST'].includes(props.gameStatus) ? (
            <AppText>You have {props.gameStatus}!</AppText>
          ) : (
            <>
              <AppText>Number to Guess: {props.guessNumber}</AppText>
              <AppText>Chances Remaining: {props.chancesRemaining}</AppText>
            </>
          )}
        </View>
        <View style={styles.tiles}>
          {props.tiles.map(ele => (
            <Card
              key={ele.id}
              id={ele.id}
              title={ele.title}
              value={ele.value}
              showData={ele.revealed}
              onClick={props.onRevealCard}
            />
          ))}
        </View>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    alignItems: 'center',
  },
  backNavigation: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'violet'
  },
  tiles: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 30,
  },
});

export default GameScreen;
