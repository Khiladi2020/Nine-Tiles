import React, {useState, useEffect} from 'react';
import {ToastAndroid, Alert, StatusBar, Image} from 'react-native';

import {shuffleListData} from './app/utils/shuffle';
import GameScreen from './app/screens/GameScreen';
import HomeScreen from './app/screens/HomeScreen';
import AppText from './app/components/AppText';
import AppDialog from './app/components/AppDialog';

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

const TOTAL_LIVES = 3;

const App = () => {
  const [guessNumber, setGuessNumber] = useState(1);
  const [livesRemaining, setLivesRemaining] = useState(3);
  const [tilesState, setTilesState] = useState(TILES);
  const [gameStatus, setGameStatus] = useState('PROGRESS');
  const [screenType, setScreenType] = useState('HOME');
  const [showGameMessage, setShowGameMessage] = useState(false);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const shuffleTiles = () => {
    setTilesState(shuffleListData(TILES));
  };

  const updateTiles = (type, id = null) => {
    switch (type) {
      case 'reveal':
        setTilesState(val =>
          val.map(ele => (ele.id === id ? {...ele, revealed: true} : ele)),
        );
        break;
      case 'revealAll':
        setTilesState(val => val.map(ele => ({...ele, revealed: true})));
        break;
    }
  };

  const updateGuessNumber = type => {
    switch (type) {
      case 'increase':
        if (guessNumber === 9) return;
        setGuessNumber(val => val + 1);
        break;
      case 'decrease':
        if (guessNumber === 1) return;
        setGuessNumber(val => val - 1);
    }
  };

  const updateLives = type => {
    switch (type) {
      case 'decrease':
        if (livesRemaining === 0) return;
        setLivesRemaining(val => val - 1);
        break;
      case 'reset':
        setLivesRemaining(TOTAL_LIVES);
    }
  };

  const updateGameStatus = type => {
    switch (type) {
      case 'win':
        setGameStatus('WIN');
        break;
      case 'lose':
        setGameStatus('LOSE');
        break;
      case 'reset':
        setGameStatus('PROGRESS');
    }
  };

  const updateScreen = type => {
    switch (type) {
      case 'HOME':
        setScreenType('HOME');
        break;
      case 'GAME':
        setScreenType('GAME');
    }
  };

  useEffect(() => {
    // if no live remaining then game lost
    if (livesRemaining === 0) {
      setGameStatus('lose');
      setShowGameMessage(true);
    }
  }, [livesRemaining]);

  const handleTileClick = id => {
    // if game already won/lost than return
    if (gameStatus !== 'PROGRESS') return;

    // if no chances are there
    if (livesRemaining === 0) return;

    // check if current tile is already revealed
    let tileRevealed = tilesState.filter(ele => ele.id === id)[0].revealed;
    if (tileRevealed) return;

    // check if current tile is correct one
    let tileValue = tilesState.filter(ele => ele.id === id)[0].value;
    if (tileValue === guessNumber) {
      updateGameStatus('win');
      updateTiles('reveal', id);
      setShowGameMessage(true);
      return;
    }
    // incase incorrect tile
    updateTiles('reveal', id);
    updateLives('decrease');
  };

  const startGame = () => {
    updateLives('reset');
    updateGameStatus('reset');
    shuffleTiles();
    updateScreen('GAME');
  };

  return (
    <>
      <StatusBar backgroundColor="#f2fde4" barStyle="dark-content" />
      {screenType === 'HOME' ? (
        <HomeScreen
          changeScreen={updateScreen}
          guessNumber={guessNumber}
          increaseCount={() => updateGuessNumber('increase')}
          decreaseCount={() => updateGuessNumber('decrease')}
          startGame={startGame}
        />
      ) : (
        <GameScreen
          changeScreen={updateScreen}
          livesRemaining={livesRemaining}
          tiles={tilesState}
          onTileClick={handleTileClick}
          guessNumber={guessNumber}
          gameStatus={gameStatus}
          revealAllTiles={() => updateTiles('revealAll')}
        />
      )}
      <AppDialog
        visible={showGameMessage}
        onClose={() => setShowGameMessage(false)}>
        {gameStatus === 'WIN' ? (
          <>
            <Image
              style={{height: 150, width: 150, marginBottom:20}}
              source={require('./app/assets/trophy.png')}
            />
            <AppText>Congratulations!</AppText>
          </>
        ) : (
          <>
            <Image
              style={{height: 150, width: 150, marginBottom:20}}
              source={require('./app/assets/game-over.png')}
            />
            <AppText>Game Over!</AppText>
          </>
        )}
      </AppDialog>
    </>
  );
};

export default App;
