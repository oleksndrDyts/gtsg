import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PageContainer from 'components/PageContainer/';
import PlayerInfo from 'components/PlayerInfo';
import PlayingProcess from 'components/PlayingProcess';
import { useSong } from 'hooks/useSong';

// import sk from '../music/sk.mp3';

import { songs } from 'songs';

const GamePage = ({ players, webSocket, typeOfConnection }) => {
  // const [songFrom, setSongFrom] = useState({ artist: '', text: [], track: '' });
  const navigate = useNavigate();
  const [player1, setPlayer1] = useState({
    name: players.firstPlayer,
    score: 0,
    isPlayerPlayingNow: typeOfConnection === 'connect' ? false : true,
  });
  const [player2, setPlayer2] = useState({
    name: players.secondPlayer,
    score: 0,
    isPlayerPlayingNow: typeOfConnection === 'create' ? true : false,
  });
  const { song } = useSong(
    songs,
    player1.isPlayerPlayingNow,
    typeOfConnection,
    webSocket
  );

  useEffect(() => {
    if (player1.name === '' && player2.name === '') {
      navigate('/');
    }
  });

  useEffect(() => {
    if (typeOfConnection === null) {
      return;
    }

    setPlayer1(prevState => {
      const newState = { ...prevState };
      newState.isPlayerPlayingNow =
        typeOfConnection === 'create' ? true : false;
      return newState;
    });
    setPlayer2(prevState => {
      const newState = { ...prevState };
      newState.isPlayerPlayingNow =
        typeOfConnection === 'create' ? false : true;
      return newState;
    });
  }, [typeOfConnection, webSocket]);

  return (
    <PageContainer
      block={typeOfConnection !== null && player1.isPlayerPlayingNow === false}
    >
      <PlayerInfo players={[player1, player2]} multi={webSocket} />
      <PlayingProcess
        song={song}
        player1={{ info: player1, setInfo: setPlayer1 }}
        player2={{ info: player2, setInfo: setPlayer2 }}
        typeOfConnection={typeOfConnection}
        webSocket={webSocket}

        // play={play}
        // stop={stop}
      />
    </PageContainer>
  );
};

export default GamePage;
