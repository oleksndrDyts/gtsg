import css from './PlayerInfo.module.css';

const PlayerInfo = ({ player }) => {
  return (
    <div className={css.container}>
      <p>
        Гравець <span className={css.player}>{player.name}</span>
      </p>
      <p>
        Бали: <span className={css.points}>{player.score} </span>
      </p>
    </div>
  );
};

export default PlayerInfo;
