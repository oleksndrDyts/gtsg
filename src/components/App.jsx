import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import StartPage from 'pages/StartPage';
import GamePage from 'pages/GamePage';

import { useSetPlayersNames } from 'hooks/useSetPlayersNames';

const App = () => {
  const [gameType, setGameType] = useState('inOneDevice');
  const { players, setPlayers, shouldStart } = useSetPlayersNames();

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
          />
        }
      />
      <Route path="/game" element={<GamePage players={players} />} />
    </Routes>
  );
};

export default App;
