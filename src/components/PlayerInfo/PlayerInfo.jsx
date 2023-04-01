import css from './PlayerInfo.module.css';

const PlayerInfo = ({ players }) => {
  return (
    <div className={css.container}>
      {players.map((player, idx) => {
        const classNames = player.isPlayerPlayingNow
          ? `${css.item}`
          : `${css.item} ${css.notActive}`;
        return (
          <div className={classNames} key={idx}>
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
