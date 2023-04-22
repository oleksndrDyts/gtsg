const EndGame = ({ player1, player2, webSocket }) => {
  if (webSocket !== null) {
    if (player1.score > player2.score) {
      return (
        <>
          <p>Вітаємо!</p>
          <p>Ви виграли з рахунком</p>
          <p>
            {player1.score} : {player2.score}
          </p>
        </>
      );
    } else {
      return (
        <>
          <p>На жаль</p>
          <p>Ви програли з рахунком</p>
          <p>
            {player1.score} : {player2.score}
          </p>
        </>
      );
    }
  } else {
    if (player1.score > player2.score) {
      return (
        <>
          <p>Вітаємо {player1.name}</p>
          <p>Ви виграли з рахунком</p>
          <p>
            {player1.score} : {player2.score}
          </p>
        </>
      );
    } else {
      return (
        <>
          <p>Вітаємо {player2.name}</p>
          <p>Ви виграли з рахунком</p>
          <p>
            {player1.score} : {player2.score}
          </p>
        </>
      );
    }
  }
};

export default EndGame;
