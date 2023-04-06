import MainLink from 'components/MainLink.jsx';
import PageContainer from 'components/PageContainer/';
import SetPlayersNames from 'components/SetPlayersNames';
import SetGameType from 'components/SetGameType';

const StartPage = ({ setPlayers, shouldStart, setGameType, gameType }) => {
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
        <p>lll</p>
      )}
    </PageContainer>
  );
};

export default StartPage;
