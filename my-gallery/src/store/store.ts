import { atom } from 'recoil';
import { AlbumItem, ImageItem } from '../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const imagesState = atom<ImageItem[]>({
  key: 'imagesState',
  default: [],
});

const defaultAlbum: AlbumItem = {
  id: -1,
  title: '기본 앨범',
};

export const albumsState = atom<AlbumItem[]>({
  key: 'albumsState',
  default: [defaultAlbum],
  effects: [
    ({ setSelf, onSet }) => {
      const loadPersisted = async () => {
        const savedAlbums = await AsyncStorage.getItem('@albums');
        if (savedAlbums != null) setSelf(JSON.parse(savedAlbums));
      };
      loadPersisted();

      onSet(newAlbums => {
        AsyncStorage.setItem('@albums', JSON.stringify(newAlbums));
      });
    },
  ],
});

export const selectedAlbumState = atom<AlbumItem>({
  key: 'selectedAlbumState',
  default: defaultAlbum,
});

export const selectedImageState = atom<ImageItem>({
  key: 'selectedImageState',
  default: {
    id: 0,
    uri: '',
    albumId: 0,
  },
});

export const newAlbumTitleState = atom<string>({
  key: 'newAlbumTitleState',
  default: '',
});

export const imagesWithAddButtonState = atom<ImageItem[]>({
  key: 'imagesWithAddButtonState',
  default: [],
});

export const modalStateAtom = atom({
  key: 'modalState',
  default: {
    isInputModalOpen: false,
    isDropdownOpen: false,
    isBigImgModalOpen: false,
  },
});
