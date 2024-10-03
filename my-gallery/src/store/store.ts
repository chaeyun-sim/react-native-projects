import { atom } from 'recoil';
import { AlbumItem, ImageItem } from '../types/types';

export const imagesState = atom<ImageItem[]>({
  key: 'imagesState',
  default: [],
});

export const filteredImagesState = atom<ImageItem[]>({
  key: 'filteredImagesState',
  default: [],
});

const defaultAlbum: AlbumItem = {
  id: -1,
  title: '기본 앨범',
};

export const albumsState = atom<AlbumItem[]>({
  key: 'albumsState',
  default: [defaultAlbum],
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
  key: 'imagesWithAddButton',
  default: [],
});
