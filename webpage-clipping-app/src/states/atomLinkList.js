import { atom, useRecoilState } from 'recoil';
import { getStorage, removeStorage, setStorage } from '../utils/AsyncStorageUtils';

const asyncStorageEffect =
  key =>
  async ({ setSelf, onSet }) => {
    const savedValue = await getStorage(key);
    if (savedValue) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) =>
      isReset ? removeStorage(key) : setStorage(key, JSON.stringify(newValue))
    );
  };

export const atomLinkList = atom({
  key: 'MAIN/LINK_LIST',
  default: {
    list: [],
  },
  effects: [asyncStorageEffect('MAIN/LINK_LIST')],
});
