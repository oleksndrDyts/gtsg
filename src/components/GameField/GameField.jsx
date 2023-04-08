/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import Item from './Item';
import css from './GameField.module.css';

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

const GameField = ({
  song,
  score,
  decreaseScore,
  setPlayerScore,
  setGameProcess,
  typeOfConnection,
  webSocket,
  player1,
}) => {
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
    playerSongText.includes(undefined);

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

  useEffect(() => {
    if (webSocket === null) {
      return;
    }

    if (player1.info.isPlayerPlayingNow === false) {
      return;
    } else {
      webSocket.emit('set-playerSongText', {
        playerSongText,
      });
    }
  }, [playerSongText, player1.isPlayerPlayingNow, typeOfConnection]);

  useEffect(() => {
    if (webSocket === null) {
      return;
    }

    if (player1.info.isPlayerPlayingNow === false) {
      return;
    } else {
      webSocket.emit('set-comparedResult', {
        comparedResult,
      });
    }
  }, [comparedResult, player1.isPlayerPlayingNow, typeOfConnection]);
  useEffect(() => {
    if (webSocket === null) {
      return;
    }

    if (player1.info.isPlayerPlayingNow === false) {
      return;
    } else {
      webSocket.emit('set-isPlayerWon', {
        isPlayerWon,
        typeOfConnection,
      });
    }
  }, [isPlayerWon, player1.isPlayerPlayingNow, typeOfConnection]);
  useEffect(() => {
    if (webSocket === null) {
      return;
    }

    if (player1.info.isPlayerPlayingNow === false) {
      return;
    } else {
      webSocket.emit('set-isResultCompared', {
        isResultCompared,
        typeOfConnection,
      });
    }
  }, [isResultCompared, player1.isPlayerPlayingNow]);

  useEffect(() => {
    if (webSocket === null) {
      return;
    }
    if (player1.info.isPlayerPlayingNow === true) {
      return;
    } else {
      webSocket.on('get-playerSongText', data => {
        setPlayerSongText(data);
      });
    }
  }, [player1.info.isPlayerPlayingNow, webSocket]);
  useEffect(() => {
    if (webSocket === null) {
      return;
    }
    if (player1.info.isPlayerPlayingNow === true) {
      return;
    } else {
      webSocket.on('get-comparedResult', data => {
        setComparedResult(data);
      });
    }
  }, [player1.info.isPlayerPlayingNow, webSocket]);
  useEffect(() => {
    if (webSocket === null) {
      return;
    }
    if (player1.info.isPlayerPlayingNow === true) {
      return;
    } else {
      webSocket.on('get-isPlayerWon', data => {
        setPlayerWon(data);
      });
    }
  }, [player1.info.isPlayerPlayingNow, webSocket]);
  useEffect(() => {
    if (webSocket === null) {
      return;
    }
    if (player1.info.isPlayerPlayingNow === true) {
      return;
    } else {
      webSocket.on('get-isResultCompared', data => {
        setResultCompared(data);
      });
    }
  }, [player1.info.isPlayerPlayingNow, webSocket]);
  return (
    <>
      <div className={css.container}>
        {song.text.map((text, idx) => (
          <Item
            key={idx}
            songText={text}
            idx={idx}
            setText={handleSetSongText}
            decreaseScore={decreaseScore}
            isRightResult={comparedResult[idx]}
            score={score}
            webSocket={webSocket}
            player1={player1}
          />
        ))}
      </div>
      {isPlayerWon && (
        <p style={{ marginTop: '20px' }}>Отримано балів: {score}</p>
      )}

      {!isResultCompared ? (
        <button
          className={css.btn}
          onClick={() => {
            compareResult();
          }}
          disabled={shouldCompare ? true : false}
          type="button"
        >
          Зрівняти результат
        </button>
      ) : (
        <button
          className={`${css.btn} ${isPlayerWon ? css.won : css.lose}`}
          onClick={goNextGameStage}
          disabled={shouldCompare ? true : false}
          type="button"
        >
          Далі
        </button>
      )}
    </>
  );
};

export default GameField;
