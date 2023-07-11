import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const checkAnswer = createAsyncThunk(
  'checkAnswer',
  async ({ word, answer, type }) => {
    const promise = new Promise((resolve, reject) => {
      if (word === answer) {
        setTimeout(
          () => resolve(type === 'ru' ? { ru: true } : { en: true }),
          1000
        );
      } else {
        setTimeout(() => resolve(false), 1000);
      }
    });

    const result = await promise.then((result) => result);

    return result;
  }
);

const repeatWordsSlice = createSlice({
  name: 'repeatWords',
  initialState: {
    loading: false,
    display: false,
    type: 'ru',
    next: false,
    correct: { ru: false, en: false },
    wordsToRepeat: [],
    doneWords: [],
    currentWord: null,
  },
  extraReducers: {
    [checkAnswer.pending]: (state) => {},
    [checkAnswer.fulfilled]: (state, action) => {
      if (!action.payload && state.type === 'ru') {
        state.type = 'en';
        state.correct.ru = false;
        return;
      }
      if (!action.payload && state.type === 'en') {
        state.next = true;
        state.type = 'ru';
        state.correct.en = false;
        return;
      }
      if (action.payload.ru) {
        state.correct.ru = true;
        state.type = 'en';
      } else {
        if (!state.correct.ru) {
          state.next = true;
        }
        state.correct.en = true;
        state.type = 'ru';
      }
    },
  },
  reducers: {
    setNext: (state) => {
      state.next = false;
    },
    setVisible: (state) => {
      state.display = true;
    },
    setInvisible: (state) => {
      state.display = false;
    },
    setCurrentWord: (state, action) => {
      state.currentWord = action.payload;
    },
    setIncorrect: (state) => {
      state.correct = { ru: false, en: false };
    },
    setType: (state) => {
      state.type = 'ru';
    },
    toggleWordToRepeat: (state, action) => {
      const isContain = state.wordsToRepeat.find(
        (word) => word.id === action.payload.id
      );
      if (!isContain) {
        state.wordsToRepeat.push(action.payload);
      } else {
        state.wordsToRepeat = state.wordsToRepeat.filter(
          (word) => word.id !== action.payload.id
        );
      }
    },
    setWordDone: (state, action) => {
      state.doneWords = [...state.doneWords, action.payload];
      state.correct = { ru: false, en: false };
    },
    removeRepeatWords: (state) => {
      state.wordsToRepeat = [];
      state.doneWords = [];
    },
  },
});

export const {
  toggleWordToRepeat,
  setVisible,
  setInvisible,
  setIncorrect,
  removeRepeatWords,
  setCurrentWord,
  setWordDone,
  setType,
  setNext,
} = repeatWordsSlice.actions;

export default repeatWordsSlice.reducer;
