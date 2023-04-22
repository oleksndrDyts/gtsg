import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import StartPage from 'pages/StartPage';
import GamePage from 'pages/GamePage';

import { useSetPlayersNames } from 'hooks/useSetPlayersNames';

const App = () => {
  const [webSocket, setWebSocket] = useState(null);
  const [gameType, setGameType] = useState('inOneDevice');
  const { players, setPlayers, shouldStart } = useSetPlayersNames();
  const [typeOfConnection, setTypeOfConnection] = useState(null);

  // useEffect(() => {
  //   setWebSocket(null);
  // }, [gameType === 'inOneDevice']);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <StartPage
            setPlayers={setPlayers}
            shouldStart={shouldStart}
            gameType={gameType}
            setGameType={setGameType}
            multiInfo={{
              setWebSocket,
              webSocket,
              playerName: players.firstPlayer,
            }}
            typeOfConnection={typeOfConnection}
            setTypeOfConnection={setTypeOfConnection}
          />
        }
      />
      <Route
        path="/game"
        element={
          <GamePage
            players={players}
            webSocket={webSocket}
            typeOfConnection={typeOfConnection}
          />
        }
      />
    </Routes>
  );
};

export default App;
