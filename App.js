import React, {useState, useEffect} from 'react';
import {Text, View, ToastAndroid, Alert, StatusBar} from 'react-native';

import GameScreen from './app/screens/GameScreen';
import HomeScreen from './app/screens/HomeScreen';

const TILES = [
  {
    id: 't1',
    title: 'Tile 1',
    value: 1,
    revealed: false,
  },
  {
    id: 't2',
    title: 'Tile 2',
    value: 2,
    revealed: false,
  },
  {
    id: 't3',
    title: 'Tile 3',
    value: 3,
    revealed: false,
  },
  {
    id: 't4',
    title: 'Tile 4',
    value: 4,
    revealed: false,
  },
  {
    id: 't5',
    title: 'Tile 5',
    value: 5,
    revealed: false,
  },
  {
    id: 't6',
    title: 'Tile 6',
    value: 6,
    revealed: false,
  },
  {
    id: 't7',
    title: 'Tile 7',
    value: 7,
    revealed: false,
  },
  {
    id: 't8',
    title: 'Tile 8',
    value: 8,
    revealed: false,
  },
  {
    id: 't9',
    title: 'Tile 9',
    value: 9,
    revealed: false,
  },
];

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const App = () => {
  const [guessNumber, setGuessNumber] = useState(1);
  const [chancesRemaining, setChancesRemaining] = useState(3);
  const [tilesState, setTilesState] = useState(TILES);
  const [gameWinStatus, setGameWinStatus] = useState('PENDING');
  const [screenType, setScreenType] = useState('HOME');

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const shuffleTiles = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffleArray(numbers);
    // create a deep copy
    let newObj = TILES.map(val => Object.assign({}, val));

    for (let i = 0; i < numbers.length; i++) {
      newObj[i].value = numbers[i];
    }
    setTilesState(newObj);
  };

  const revealCard = id => {
    // if game already won than return
    if (gameWinStatus !== 'PENDING') return;

    if (tilesState.filter(ele => ele.id === id)[0].value === guessNumber) {
      setGameWinStatus('WON');
      Alert.alert('Status', 'Congrats!! You have won');
    }

    // update card status
    setTilesState(val =>
      val.map(ele => (ele.id === id ? {...ele, revealed: true} : ele)),
    );

    // decrease lives
    decreaseChances();
  };

  const revealAllCards = () => {
    setTilesState(val => val.map(ele => ({...ele, revealed: true})));
  };

  const increaseCount = () => {
    if (guessNumber === 9) {
      showToast('Guess Number Cannot be more than 9');
      return;
    }
    setGuessNumber(value => value + 1);
  };

  const decreaseCount = () => {
    if (guessNumber == 1) {
      showToast('Guess Number Cannot be negative');
      return;
    }
    setGuessNumber(value => value - 1);
  };

  const decreaseChances = () => {
    if (chancesRemaining === 0) return;
    setChancesRemaining(value => value - 1);
  };

  const changeScreen = type => {
    if (type == 'HOME') setScreenType('HOME');
    else if (type == 'GAME') setScreenType('GAME');
  };

  const startGame = () => {
    setChancesRemaining(3);
    setGameWinStatus('PENDING');
    // shuffle cards
    shuffleTiles();
    changeScreen('GAME');
  };

  useEffect(() => {
    if (chancesRemaining === 0 && gameWinStatus === 'PENDING') {
      Alert.alert('Status', 'Game Over!');
      setGameWinStatus('LOST');
    }
  }, [chancesRemaining, gameWinStatus]);

  // if(screenType === "HOME") retu

  return (
    <>
      <StatusBar backgroundColor="#f2fde4" barStyle='dark-content'/>
      {screenType === 'HOME' ? (
        <HomeScreen
          changeScreen={changeScreen}
          guessNumber={guessNumber}
          increaseCount={increaseCount}
          decreaseCount={decreaseCount}
          startGame={startGame}
        />
      ) : (
        <GameScreen
          changeScreen={changeScreen}
          chancesRemaining={chancesRemaining}
          decreaseChances={decreaseChances}
          tiles={tilesState}
          onRevealCard={revealCard}
          guessNumber={guessNumber}
          gameStatus={gameWinStatus}
          revealAllCards={revealAllCards}
        />
      )}
    </>
  );
};

export default App;
