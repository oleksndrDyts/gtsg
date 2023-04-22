/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from 'react';
import css from './Item.module.css';

const Item = ({
  songText,
  setText,
  idx,
  decreaseScore,
  isRightResult,
  score,
  webSocket,
  player1,
}) => {
  const [isItemOpen, setOpenItem] = useState(false);
  const [isUserAddWord, setUserAddWord] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const handleSetItemOpen = () => {
    if (isUserAddWord) {
      return;
    }

    setOpenItem(true);
    setText(idx, songText);
    decreaseScore();
  };

  const handleUserAddWord = () => {
    if (isItemOpen) {
      return;
    }
    setUserAddWord(true);
  };
  const handleUserCancelAddWord = () => {
    setUserAddWord(false);
    setInputValue('');
    setText(idx, undefined);
  };

  const rightAnswearClass = () => {
    if (isRightResult === 'notCompared') {
      return '';
    }

    if (isRightResult === false) {
      return css.wrongAnswear;
    }
    if (isRightResult === true) {
      return css.rightAnswear;
    }
  };

  const anotherInnerContainerClass = isItemOpen
    ? `${css.anotherInnerContainer} ${css.notactive}`
    : `${css.anotherInnerContainer} ${css.active}`;

  const itemText = isItemOpen
    ? songText
    : webSocket === null
    ? 'Відкрити слово'
    : player1.info.isPlayerPlayingNow
    ? 'Відкрити слово'
    : '-';

  useEffect(() => {
    setText(idx, inputValue);
  }, [inputValue]);

  useEffect(() => {
    if (webSocket === null) {
      return;
    }

    webSocket.emit('set-itemText', {
      inputValue,
      idx,
      isPlaying: player1.info.isPlayerPlayingNow,
    });
  }, [inputValue]);

  useEffect(() => {
    if (webSocket === null) {
      return;
    }

    webSocket.on('get-itemText', data => {
      if (idx === data.idx) {
        setInputValue(data.inputValue);
      }
    });
  }, [webSocket]);

  useEffect(() => {
    if (webSocket === null) {
      return;
    }
    webSocket.emit('set-isItemOpen', {
      idx,
      isItemOpen,
      isPlaying: player1.info.isPlayerPlayingNow,
    });
  }, [isItemOpen]);

  useEffect(() => {
    if (webSocket === null) {
      return;
    }
    webSocket.emit('set-isUserAddWord', {
      idx,
      isUserAddWord,
      isPlaying: player1.info.isPlayerPlayingNow,
    });
  }, [isUserAddWord]);

  useEffect(() => {
    if (webSocket === null) {
      return;
    }

    webSocket.on('get-isItemOpen', data => {
      if (data.idx === idx) {
        setOpenItem(data.isItemOpen);
      }
    });
  }, [webSocket]);
  useEffect(() => {
    if (webSocket === null) {
      return;
    }

    webSocket.on('get-isUserAddWord', data => {
      if (data.idx === idx) {
        setUserAddWord(data.isUserAddWord);
      }
    });
  }, [webSocket]);

  return (
    <div
      className={css.container}
      style={{
        pointerEvents:
          isRightResult !== 'notCompared' || isItemOpen ? 'none' : 'auto',
      }}
    >
      {isRightResult === false && (
        <div
          className={`${css.compareFalse} ${idx < 3 ? css.top : css.bottom}`}
        >
          Правильна відповідь: <span>{songText}</span>
        </div>
      )}
      {isUserAddWord ? (
        <>
          <div
            className={`${css.innerContainer} ${rightAnswearClass()}`}
            onClick={() => {
              inputRef.current.focus();
            }}
          >
            {/* {isRightResult === 'notCompared' && <span>?</span>} */}
            <input
              value={inputValue}
              onChange={e => {
                setInputValue(e.target.value);
              }}
              className={`${css.input} ${rightAnswearClass()}`}
              type="text"
              autoFocus={true}
              ref={inputRef}
            ></input>
            {/* {isRightResult === 'notCompared' && <span>?</span>} */}
          </div>
        </>
      ) : (
        <div
          onClick={() => {
            handleSetItemOpen();

            if (score !== 1) {
              return;
            }
          }}
          // style={{ pointerEvents: isItemOpen ? 'none' : 'auto' }}
          className={`${css.innerContainer} ${
            isItemOpen ? css.opened : css.notopened
          }`}
        >
          <p>{itemText}</p>
        </div>
      )}

      {isRightResult === 'notCompared' && (
        <>
          {webSocket !== null && !player1.info.isPlayerPlayingNow ? (
            <></>
          ) : (
            !isItemOpen && (
              <div
                onClick={
                  isUserAddWord ? handleUserCancelAddWord : handleUserAddWord
                }
                className={anotherInnerContainerClass}
              >
                <span>{isUserAddWord ? 'Скасувати' : 'Ввести'}</span>
              </div>
            )
          )}
        </>
      )}
      {/* {} */}
    </div>
  );
};

export default Item;
