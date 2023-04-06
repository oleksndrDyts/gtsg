import { useState } from 'react';

export const useSetPlayersNames = () => {
  const [firstPlayerName, setFirstPlayerName] = useState('');
  const [secondPlayerName, setSecondPlayerName] = useState('');

  return {
    players: { firstPlayer: firstPlayerName, secondPlayer: secondPlayerName },
    setPlayers: { setFirstPlayerName, setSecondPlayerName },
    shouldStart: firstPlayerName !== '' && secondPlayerName !== '',
  };
};
