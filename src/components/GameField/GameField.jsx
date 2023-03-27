import { useState } from 'react';

import Item from './Item';
import css from './GameField.module.css';

const GameField = ({ song, player }) => {
  const [playerSongText, setPlayerSongText] = useState([]);
  const [currentScore, setCurrentScore] = useState(6);
  const [comparedResult, setComparedResult] = useState([
    'notCompared',
    'notCompared',
    'notCompared',
    'notCompared',
    'notCompared',
    'notCompared',
  ]);

  const shouldCompare =
    playerSongText.length !== 6 ||
    playerSongText.includes(null) ||
    playerSongText.includes(undefined);

  const handleSetSongText = (idx, text) => {
    setPlayerSongText(prevState => {
      const newState = [...prevState];
      newState[idx] = text;
      return newState;
    });
  };

  const decreaseScore = () => {
    setCurrentScore(prevState => prevState - 1);
  };

  const compareResult = () => {
    if (shouldCompare) {
      return;
    }

    const result = song.text.map((el, idx) => {
      return el.toLowerCase() === playerSongText[idx].toLowerCase();
    });
    setComparedResult(result);
  };

  const getIsPlayerWon = () => {
    for (const item of comparedResult) {
      if (item !== true) {
        return false;
      }
    }
    return true;
  };

  console.log(getIsPlayerWon());

  return (
    <>
      <div className={css.container}>
        {song.text.map((text, idx) => (
          <Item
            songText={text}
            idx={idx}
            setText={handleSetSongText}
            decreaseScore={decreaseScore}
            isRightResult={comparedResult[idx]}
          />
        ))}
      </div>
      {getIsPlayerWon() && (
        <p style={{ marginTop: '20px' }}>Отримано балів: {currentScore}</p>
      )}

      <button
        style={{ marginTop: '100px' }}
        onClick={compareResult}
        disabled={shouldCompare ? true : false}
      >
        Compare
      </button>
    </>
  );
};

export default GameField;
