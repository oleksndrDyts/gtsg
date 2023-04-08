import MainLink from 'components/MainLink.jsx';
import PageContainer from 'components/PageContainer/';
import SetPlayersNames from 'components/SetPlayersNames';
import SetGameType from 'components/SetGameType';
import MultiGame from 'components/MultiGame';

const StartPage = ({
  setPlayers,
  shouldStart,
  setGameType,
  gameType,
  multiInfo,
  typeOfConnection,
  setTypeOfConnection,
}) => {
  return (
    <PageContainer centerContent>
      <p style={{ marginBottom: '50px' }}>Вітаю у грі, почнімо ?</p>
      <SetGameType gameType={gameType} setGameType={setGameType} />
      {gameType === 'inOneDevice' ? (
        <>
          <SetPlayersNames setPlayers={setPlayers} />
          <MainLink shouldStart={shouldStart}>Старт</MainLink>
        </>
      ) : (
        <>
          <SetPlayersNames setPlayers={setPlayers} multi />
          <MultiGame
            multiInfo={multiInfo}
            setPlayers={setPlayers}
            typeOfConnection={typeOfConnection}
            setTypeOfConnection={setTypeOfConnection}
          />

          <MainLink shouldStart={shouldStart}>Старт</MainLink>
        </>
      )}
    </PageContainer>
  );
};

export default StartPage;
