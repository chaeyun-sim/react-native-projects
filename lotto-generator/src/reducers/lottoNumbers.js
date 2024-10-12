import { CLEAR_HISTORY, CREATE_NEW_NUMBERS } from '../actions/lottoNumbers';

const initialState = {
  currentNumber: [],
  history: [],
};

export const lottoNumberReducer = (state = initialState, action) => {
  if (action.type === CREATE_NEW_NUMBERS) {
    const date = new Date();
    return {
      ...state,
      currentNumber: action.numbers,
      history: [
        ...state.history,
        {
          date: `${date.getFullYear()}. ${date.getMonth()}. ${date.getDate()} ${date.getHours()}:${date.getMinutes()}`,
          numbers: action.numbers,
        },
      ],
    };
  } else if (action.type === CLEAR_HISTORY) {
    return {
      ...state,
      history: [],
    };
  }

  return {
    ...state,
  };
};
