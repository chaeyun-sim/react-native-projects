import { getRandomSixNumber } from '../utils/getRandomSixNumber';

export const CREATE_NEW_NUMBERS = 'CREATE_NEW_NUMBERS';
export const CLEAR_HISTORY = 'CLEAR_HISTORY';

export const createNewNumbers = () => {
  const numbers = getRandomSixNumber();

  return {
    type: CREATE_NEW_NUMBERS,
    numbers,
  };
};

export const clearHistory = () => {
  return {
    type: CLEAR_HISTORY,
  };
};
