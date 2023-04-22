import PageContainer from 'components/PageContainer/';
import SetPlayersNames from 'components/SetPlayersNames';
import SetGameType from 'components/SetGameType';
import MultiGame from 'components/MultiGame';
import SwitchComponent from 'components/SwitchComponent';

import { InOneDevice } from 'components/GameTypes';

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

      <SwitchComponent
        caseTo={gameType}
        arrayOfItems={[
          {
            caseTo: 'inOneDevice',
            childs: [
              <InOneDevice
                multiInfo={multiInfo}
                setPlayers={setPlayers}
                shouldStart={shouldStart}
                setTypeOfConnection={setTypeOfConnection}
                key={1}
              />,
            ],
          },
          {
            caseTo: 'inDifferentDevices',
            childs: [
              <MultiGame
                key={1}
                multiInfo={multiInfo}
                setPlayers={setPlayers}
                typeOfConnection={typeOfConnection}
                setTypeOfConnection={setTypeOfConnection}
                gameType={gameType}
              >
                <SetPlayersNames setPlayers={setPlayers} multi key={2} />
              </MultiGame>,
            ],
          },
        ]}
      />
    </PageContainer>
  );
};

export default StartPage;
