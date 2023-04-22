import { useGameField } from 'hooks/useGameField';

import Item from './Item';
import css from './GameField.module.css';

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
  const {
    handleSetSongText,
    comparedResult,
    isPlayerWon,
    isResultCompared,
    compareResult,
    shouldCompare,
    goNextGameStage,
  } = useGameField(
    song,
    setGameProcess,
    webSocket,
    player1,
    typeOfConnection,
    setPlayerScore
  );
  return (
    <>
      {webSocket !== null && !player1.info.isPlayerPlayingNow && (
        <p className={css.text}>Грає противник</p>
      )}
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

      {webSocket !== null && !player1.info.isPlayerPlayingNow ? (
        <></>
      ) : !isResultCompared ? (
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
