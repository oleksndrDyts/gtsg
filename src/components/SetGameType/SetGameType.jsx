import css from './SetGameType.module.css';

const SetGameType = ({ gameType, setGameType }) => {
  const setClassName = type => {
    if (type === gameType) {
      return `${css.btn} ${css.active}`;
    }
    return css.btn;
  };

  return (
    <div className={css.container}>
      <button
        onClick={() => {
          setGameType('inOneDevice');
        }}
        className={setClassName('inOneDevice')}
        type="button"
      >
        Один пристрій
      </button>
      <button
        onClick={() => {
          setGameType('inDifferentDevices');
        }}
        className={setClassName('inDifferentDevices')}
        type="button"
      >
        Різні пристрої
      </button>
      {/* <button type="button"></button> */}
    </div>
  );
};

export default SetGameType;
