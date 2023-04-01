import { useState, useRef } from 'react';
import css from './Item.module.css';

const Item = ({
  songText,
  setText,
  idx,
  decreaseScore,
  isRightResult,
  play,
  score,
}) => {
  const [isItemOpen, setOpenItem] = useState(false);
  const [isUserAddWord, setUserAddWord] = useState(false);
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

  const itemText = isItemOpen ? songText : 'Відкрити слово';

  return (
    <div
      className={css.container}
      style={{
        pointerEvents: isRightResult !== 'notCompared' ? 'none' : 'auto',
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
            {isRightResult === 'notCompared' && <span>?</span>}
            <input
              onChange={e => {
                setText(idx, e.target.value);
              }}
              className={`${css.input} ${rightAnswearClass()}`}
              type="text"
              autoFocus={true}
              ref={inputRef}
            ></input>
            {isRightResult === 'notCompared' && <span>?</span>}
          </div>
        </>
      ) : (
        <div
          onClick={() => {
            handleSetItemOpen();

            if (score !== 1) {
              return;
            }
            play();
          }}
          style={{ pointerEvents: isItemOpen ? 'none' : 'auto' }}
          className={`${css.innerContainer} ${
            isItemOpen ? css.opened : css.notopened
          }`}
        >
          <p>{itemText}</p>
        </div>
      )}

      {isRightResult === 'notCompared' && (
        <>
          {!isItemOpen && (
            <div
              onClick={
                isUserAddWord ? handleUserCancelAddWord : handleUserAddWord
              }
              className={anotherInnerContainerClass}
            >
              <span>{isUserAddWord ? 'Скасувати' : 'Ввести'}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Item;
