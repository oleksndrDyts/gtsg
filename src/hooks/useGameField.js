import { useState, useEffect } from 'react';

import useGameFieldMulti from './multiplayer/useGameFieldMulti';

const wonOrNo = items => {
  for (const item of items) {
    if (item !== true) {
      return false;
    }
  }
  // setPlayerScore();
  return true;
  // setPlayerScore();
};

export const useGameField = (
  song,
  setGameProcess,
  webSocket,
  player1,
  typeOfConnection,
  setPlayerScore
) => {
  const [playerSongText, setPlayerSongText] = useState([]);
  const [comparedResult, setComparedResult] = useState([
    'notCompared',
    'notCompared',
    'notCompared',
    'notCompared',
    'notCompared',
    'notCompared',
  ]);
  const [isPlayerWon, setPlayerWon] = useState(false);
  const [isResultCompared, setResultCompared] = useState(false);

  const shouldCompare =
    playerSongText.length !== 6 ||
    playerSongText.includes(null) ||
    playerSongText.includes(undefined) ||
    playerSongText.includes('');

  const handleSetSongText = (idx, text) => {
    setPlayerSongText(prevState => {
      const newState = [...prevState];
      newState[idx] = text;
      return newState;
    });
  };

  const compareResult = () => {
    if (shouldCompare) {
      return;
    }

    const result = song.text.map((el, idx) => {
      return el.toLowerCase() === playerSongText[idx].toLowerCase();
    });
    setComparedResult(result);
    setResultCompared(true);
  };

  const goNextGameStage = () => {
    setGameProcess(`endRound${isPlayerWon ? 'Won' : 'Lost'}`);
  };

  useEffect(() => {
    if (wonOrNo(comparedResult)) {
      setPlayerWon(true);
      setPlayerScore();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comparedResult]);

  useGameFieldMulti(
    webSocket,
    playerSongText,
    player1,
    comparedResult,
    isPlayerWon,
    isResultCompared,
    typeOfConnection,
    setPlayerSongText,
    setComparedResult,
    setPlayerWon,
    setResultCompared
  );

  return {
    handleSetSongText,
    comparedResult,
    isPlayerWon,
    isResultCompared,
    compareResult,
    shouldCompare,
    goNextGameStage,
  };
};
