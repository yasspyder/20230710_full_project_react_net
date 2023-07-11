import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  fetchDictinary,
  fetchRemoveWord,
} from '../store/slices/dictionarySlice';
import declension from '../services/declension';
import WordCardComponent from '../components/WordCardComponent';
import WordCardFormComponent from '../components/WordCardFormComponent';
import { setVisible } from '../store/slices/repeatWordsSlice';
import RepeatWords from '../components/RepeatWords';

function DictionaryPage() {
  const dispatch = useDispatch();
  const repeatWords = useSelector((state) => state.repeatWords.wordsToRepeat);
  const dictionary = useSelector((state) => state.dictionary.dictionary);
  const visibility = useSelector((state) => state.repeatWords.display);

  const [repeatWordsId, setRepeatWordsId] = useState([]);
  const [show, setShow] = useState(false);

  let location = useLocation();

  useEffect(() => {
    if (!dictionary.length) {
      dispatch(fetchDictinary());
    }
  }, []);

  const addRepeatWord = (target) => {
    const wordId = target.closest('div[data-word]').getAttribute('data-word');
    if (repeatWordsId.includes(wordId)) {
      const index = repeatWordsId.indexOf(wordId);
      repeatWordsId.splice(index, 1);
      setRepeatWordsId([...repeatWordsId]);
    } else {
      setRepeatWordsId([...repeatWordsId, wordId]);
    }
  };
  const removeWordFromDictionary = (target) => {
    const wordId = target.closest('div[data-word]').getAttribute('data-word');
    //!TODO написать хук для отложенной отправки массива слов
    dispatch(fetchRemoveWord(wordId));
  };

  const editWord = (target) => {
    const wordId = target.closest('div[data-word]').getAttribute('data-word');
    location.search = `wordId=${wordId}`;
    setShow(!show);
  };

  const startRepeatWordsTraining = () => {
    dispatch(setVisible());
  };

  return (
    <div className="container-fluid text-center mb-5">
      <h2 className="dictionary__heading mb-5">Мой словарь</h2>
      <div className="dictionary__toolbar">
        <div className="dictionary__toolbar_statistic">
          <p>
            Повторить сегодня:
            <span className="words words-red" id="repeat_words">
              {declension(repeatWords.length, ['слово', 'слова', 'слов'])}
            </span>
          </p>
          <p>
            В словаре:
            <span className="words words-green" id="all_words">
              {declension(dictionary?.length, ['слово', 'слова', 'слов'])}
            </span>
          </p>
        </div>
        <div className="dictionary__toolbar_buttons">
          <button
            className="btn btn-primary px-4"
            onClick={startRepeatWordsTraining}
            disabled={!repeatWords.length}
          >
            Тренировать слова
          </button>
          <button
            className="btn btn-primary px-4"
            onClick={() => setShow(!show)}
          >
            Добавить слово
          </button>
        </div>
      </div>
      <div>
        {visibility ? (
          <RepeatWords />
        ) : (
          <>
            <h4 className="dictionary__subheading mb-4">Коллекция слов</h4>
            <div className="d-flex justify-content-center">
              <div className="row w-100">
                {dictionary?.length ? (
                  dictionary.map((word) => (
                    <WordCardComponent
                      key={word.id}
                      id={word.id}
                      value={word.value}
                      translate={word.translate}
                      addRepeatWord={addRepeatWord}
                      removeWordFromDictionary={removeWordFromDictionary}
                      articleId={word.article_id}
                      editWord={editWord}
                      img={word.image}
                    />
                  ))
                ) : (
                  <p style={{ margin: '0 auto' }}>Ваш словарь пуст.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {show && <WordCardFormComponent setShow={setShow} show={setShow} />}
    </div>
  );
}

export default DictionaryPage;
