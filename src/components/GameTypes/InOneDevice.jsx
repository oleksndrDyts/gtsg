import MainLink from 'components/MainLink.jsx';
import SetPlayersNames from 'components/SetPlayersNames';
import { useEffect } from 'react';

const InOneDevice = ({
  setPlayers,
  shouldStart,
  multiInfo,
  setTypeOfConnection,
}) => {
  useEffect(() => {
    // multiInfo.setWebSocket(null);
    setTypeOfConnection(null);
  }, [multiInfo, setTypeOfConnection]);

  return (
    <>
      <SetPlayersNames setPlayers={setPlayers} />
      <MainLink shouldStart={shouldStart}>Старт</MainLink>
    </>
  );
};

export default InOneDevice;
