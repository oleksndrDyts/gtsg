const EndGame = ({ player1, player2, webSocket }) => {
  return (
    <>
      {webSocket !== null ? (
        player1.score > player2.score ? (
          <>
            <p>Вітаємо!</p>
            <p>Ви виграли з рахунком</p>
            <p>
              {player1.score} : {player2.score}
            </p>
          </>
        ) : (
          <>
            <p>На жаль</p>
            <p>Ви програли з рахунком</p>
            <p>
              {player1.score} : {player2.score}
            </p>
          </>
        )
      ) : player1.score > player2.score ? (
        <>
          <p>Вітаємо {player1.name}</p>
          <p>Ви виграли з рахунком</p>
          <p>
            {player1.score} : {player2.score}
          </p>
        </>
      ) : (
        <>
          <p>Вітаємо {player2.name}</p>
          <p>Ви виграли з рахунком</p>
          <p>
            {player1.score} : {player2.score}
          </p>
        </>
      )}
    </>
  );
};

export default EndGame;
