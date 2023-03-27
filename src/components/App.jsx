import { Routes, Route } from 'react-router-dom';

import StartPage from 'pages/StartPage';
import GamePage from 'pages/GamePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/game" element={<GamePage />} />
    </Routes>
  );
};

export default App;
