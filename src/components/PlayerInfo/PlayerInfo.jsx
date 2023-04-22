import css from './PlayerInfo.module.css';

const PlayerInfo = ({ players, multi }) => {
  return (
    <div className={css.container}>
      {players.map((player, idx) => {
        const classNames = player.isPlayerPlayingNow
          ? `${css.item}`
          : `${css.item} ${css.notActive}`;
        return (
          <div className={classNames} key={idx}>
            {multi && <p>{idx === 0 ? 'Ви' : 'Противник'}</p>}
            <p>
              Гравець <span className={css.player}>{player.name}</span>
            </p>
            <p>
              Бали: <span className={css.points}>{player.score} </span>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default PlayerInfo;
