// import { useEffect, useRef } from 'react';

import css from './RoundInfo.module.css';

const Text = ({ nextRound, children, song }) => {
  return (
    <div className={css.container}>
      {children}
      <p>{song.artist}</p>
      <p>{song.track}</p>
      <p>Слова пісні:</p>
      <div>
        {song.text.map((el, idx) => (
          <span key={idx}>{el} </span>
        ))}
      </div>

      <button
        className={css.btn}
        type="button"
        onClick={() => {
          nextRound();
        }}
      >
        Далі
      </button>
    </div>
  );
};

const RoundInfo = ({ info, nextRound, score, song, isMulti, isYourTurn }) => {
  switch (info) {
    case 'endRoundWon':
      return (
        <Text nextRound={nextRound} song={song}>
          <p>
            {!isMulti
              ? 'Вітаємо, ви виграли раунд!'
              : !isYourTurn
              ? 'Противник виграв :('
              : 'Вітаємо, ви виграли раунд!'}
          </p>
          <p>
            {!isMulti
              ? `Зароблені бали: ${score}`
              : !isYourTurn
              ? `Заробив: ${score}`
              : `Зароблені бали: ${score}`}
          </p>
        </Text>
      );
    case 'endRoundLost':
      return (
        <Text nextRound={nextRound} song={song}>
          <p>
            {!isMulti
              ? 'На жаль, ви програли раунд'
              : !isYourTurn
              ? 'Противник прорав !!!'
              : 'На жаль, ви програли раунд'}
          </p>
        </Text>
      );
    case 'endRoundNull':
      return (
        <Text nextRound={nextRound} song={song}>
          <p>
            {!isMulti
              ? 'Ви відкрили всі слова, вітаємо з нулем!'
              : !isYourTurn
              ? 'Противник відкрив всі слова, привітайте його з нулем'
              : 'Ви відкрили всі слова, вітаємо з нулем!'}
          </p>
        </Text>
      );

    default:
      break;
  }
};

export default RoundInfo;
