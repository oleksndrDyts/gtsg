// import { useEffect, useRef } from 'react';

import css from './RoundInfo.module.css';

const Text = ({ nextRound, children, song }) => {
  return (
    <div className={css.container}>
      {children}
      <p>{song.artist}</p>
      <p>{song.track}</p>
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

const RoundInfo = ({ info, nextRound, score, song }) => {
  //   const isFirstRender = useRef(true);
  //   useEffect(() => {
  //     if (isFirstRender.current) {
  //       isFirstRender.current = false;
  //       return;
  //     }
  //     return () => {
  //       stop();
  //     };
  //   });

  switch (info) {
    case 'endRoundWon':
      return (
        <Text nextRound={nextRound} song={song}>
          <p>Вітаємо, ви виграли раунд!</p>
          <p>Зароблені бали: {score}</p>
        </Text>
      );
    case 'endRoundLost':
      return (
        <Text nextRound={nextRound} song={song}>
          На жаль, ви програли раунд
        </Text>
      );
    case 'endRoundNull':
      return (
        <Text nextRound={nextRound} song={song}>
          Ви відкрили всі слова, вітаємо з нулем!
        </Text>
      );

    default:
      break;
  }
};

export default RoundInfo;
