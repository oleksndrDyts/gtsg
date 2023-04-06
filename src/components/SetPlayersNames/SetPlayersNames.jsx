import css from './SetPlayersNames.module.css';

const SetPlayersNames = ({ setPlayers }) => {
  return (
    <>
      <label htmlFor="first" className={css.label}>
        Перший гравець
      </label>
      <input
        autoComplete="off"
        id="first"
        className={css.input}
        type="text"
        onChange={e => {
          setPlayers.setFirstPlayerName(e.target.value.trim());
        }}
      />
      <label htmlFor="second" className={css.label}>
        Другий гравець
      </label>
      <input
        autoComplete="off"
        id="second"
        className={css.input}
        type="text"
        onChange={e => {
          setPlayers.setSecondPlayerName(e.target.value.trim());
        }}
      />
    </>
  );
};

export default SetPlayersNames;
