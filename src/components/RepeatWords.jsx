import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkAnswer,
  removeRepeatWords,
  setCurrentWord,
  setIncorrect,
  setInvisible,
  setNext,
  setType,
  setWordDone,
} from '../store/slices/repeatWordsSlice';
import { Button, Form } from 'react-bootstrap';

function RepeatWords() {
  const repeatWords = useSelector((state) => state.repeatWords.wordsToRepeat);
  const doneWords = useSelector((state) => state.repeatWords.doneWords);
  const currentWord = useSelector((state) => state.repeatWords.currentWord);
  const correct = useSelector((state) => state.repeatWords.correct);
  const type = useSelector((state) => state.repeatWords.type);
  const next = useSelector((state) => state.repeatWords.next);

  const types = { ru: 'ru', en: 'en' };
  const dispatch = useDispatch();

  const [value, setValue] = useState('');
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (repeatWords.length === doneWords.length) {
      dispatch(removeRepeatWords());
      dispatch(setInvisible());
      dispatch(setIncorrect());
      dispatch(setCurrentWord(null));
      dispatch(setType());
      setIdx(0);
    } else if (repeatWords.length < idx + 1) {
      setIdx(0);
    }
  }, [repeatWords, idx, doneWords]);

  useEffect(() => {
    if (doneWords.includes(currentWord)) {
      setIdx((prev) => prev + 1);
    }
  }, [doneWords, currentWord]);

  useEffect(() => {
    if (correct.ru && correct.en && currentWord) {
      dispatch(setWordDone(currentWord));
    }
  }, [correct, currentWord]);

  useEffect(() => {
    dispatch(setCurrentWord(repeatWords[idx]));
    dispatch(setNext());
    dispatch(setIncorrect());
  }, [repeatWords, dispatch, idx]);

  useEffect(() => {
    if ((!correct.ru || !correct.en) && next) {
      setIdx((prev) => prev + 1);
    }
  }, [correct, next, dispatch]);

  const check = async () => {
    if (type === types.ru) {
      dispatch(
        checkAnswer({
          word: value.trim().toLowerCase(),
          answer: currentWord.translate.trim().toLowerCase(),
          type,
        })
      );
    }
    if (type === types.en) {
      dispatch(
        checkAnswer({
          word: value.trim().toLowerCase(),
          answer: currentWord.value.trim().toLowerCase(),
          type,
        })
      );
    }
    setValue('');
  };

  const stopTraining = () => {
    dispatch(removeRepeatWords());
    dispatch(setInvisible());
    dispatch(setIncorrect());
    dispatch(setCurrentWord(null));
    dispatch(setType());
    setIdx(0);
  };

  return (
    <>
      <h2>Слова для повторения</h2>
      <div
        className="mt-5 mx-auto border border-secondary rounded p-5"
        style={{ width: 800 }}
      >
        <h3 className="mb-3">
          Как переводится слово "
          {type === 'ru' ? currentWord?.value : currentWord?.translate}"
        </h3>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Введите ваш вариант"
          />
          <div
            className="d-flex justify-content-center mx-auto mt-3"
            style={{ width: 50 }}
          >
            <span
              className={`border-0 rounded-circle ${
                correct.ru ? 'bg-success' : 'bg-danger'
              }`}
              style={{ width: 20, height: 20 }}
            ></span>
            {/* <span
              className={`border-0 rounded-circle ${
                correct.en ? 'bg-success' : 'bg-danger'
              }`}
              style={{ width: 20, height: 20 }}
            ></span> */}
          </div>
          <div className="d-flex flex-column mx-auto" style={{ width: 200 }}>
            <Button
              className="mt-3 w-100"
              disabled={value ? false : true}
              onClick={check}
            >
              Проверить
            </Button>
            <Button className="mt-5 w-100 bg-danger" onClick={stopTraining}>
              Выйти
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default RepeatWords;
