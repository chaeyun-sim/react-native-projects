import * as ImagePicker from 'expo-image-picker';
import { useEffect, useMemo, useState } from 'react';
import { AlbumItem, ImageItem } from '../types/types';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  albumsState,
  imagesWithAddButtonState,
  modalStateAtom,
  newAlbumTitleState,
  selectedAlbumState,
  selectedImageState,
} from '../store/store';

const defaultAlbum: AlbumItem = {
  id: -1,
  title: '기본 앨범',
};

export const useGallery = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useRecoilState(selectedAlbumState);
  const [albums, setAlbums] = useRecoilState(albumsState);
  const [selectedImage, setSelectedImage] = useRecoilState(selectedImageState);
  const [modalState, setModalState] = useRecoilState(modalStateAtom);
  const newAlbumTitle = useRecoilValue(newAlbumTitleState);
  const setImagesWithAddButton = useSetRecoilState(imagesWithAddButtonState);

  const filteredImages = useMemo(() => {
    return images.filter(image => image.albumId === selectedAlbum.id);
  }, [images, selectedAlbum]);

  useEffect(() => {
    setImagesWithAddButton([
      ...filteredImages,
      {
        id: -1,
        uri: '',
      },
    ]);
  }, [images, selectedAlbum.id]);

  useEffect(() => {
    initValues();
  }, []);

  const initValues = async () => {
    const imagesFromStorage = await AsyncStorage.getItem('@images');
    if (imagesFromStorage) setImages(JSON.parse(imagesFromStorage));
  };

  const _setImages = async (newImages: ImageItem[]) => {
    setImages(newImages);
    await AsyncStorage.setItem('@images', JSON.stringify(newImages));
  };

  const _setAlbums = async (newAlbums: AlbumItem[]) => {
    setAlbums(newAlbums);
    await AsyncStorage.setItem('@images', JSON.stringify(newAlbums));
    console.log(AsyncStorage.getItem('@images'));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newImages = [
        ...images,
        {
          id: images.length + 1,
          uri: result.assets[0].uri,
          albumId: selectedAlbum.id,
        },
      ];
      _setImages(newImages);
    }
  };

  const deleteImage = (imageId: number) => {
    Alert.alert('이미지를 삭제하시겠어요?', '', [
      {
        style: 'cancel',
        text: '아니오',
      },
      {
        text: '네',
        onPress: () => _setImages(images.filter(el => el.id !== imageId)),
      },
    ]);
  };

  const addAlbum = async () => {
    const newAlbum = {
      id: albums.length + 1,
      title: newAlbumTitle,
    };
    _setAlbums([...albums, newAlbum]);
    setSelectedAlbum(newAlbum);
  };

  const selectAlbum = (album: AlbumItem) => {
    setSelectedAlbum(album);
  };

  const deleteAlbum = (albumId: number) => {
    if (albumId === -1) return Alert.alert('기본 앨범은 삭제할 수 없습니다.');
    Alert.alert('앨범을 삭제하시겠어요?', '', [
      {
        style: 'cancel',
        text: '아니오',
      },
      {
        text: '네',
        onPress: () => {
          setAlbums(albums.filter(el => el.id !== albumId));
          setSelectedAlbum(defaultAlbum);
          setModalState({ ...modalState, isDropdownOpen: false });
        },
      },
    ]);
  };

  const selectImage = (image: ImageItem) => setSelectedImage(image);

  const moveImage = (direction: 'prev' | 'next') => {
    const selectedImageIndex = filteredImages.findIndex(
      (image: ImageItem) => image.id === selectedImage?.id
    );
    const newIndex = direction === 'prev' ? selectedImageIndex - 1 : selectedImageIndex + 1;

    if (newIndex >= 0 && newIndex < filteredImages.length) {
      setSelectedImage(filteredImages[newIndex]);
    }
  };

  const moveToPrevImage = () => moveImage('prev');
  const moveToNextImage = () => moveImage('next');
  const showPreviousArrow =
    filteredImages.findIndex((image: ImageItem) => image.id === selectedImage?.id) !== 0;
  const showNextArrow =
    filteredImages.findIndex((image: ImageItem) => image.id === selectedImage?.id) !==
    filteredImages.length - 1;

  return {
    pickImage,
    deleteImage,
    addAlbum,
    selectAlbum,
    deleteAlbum,
    selectImage,
    moveToPrevImage,
    moveToNextImage,
    showPreviousArrow,
    showNextArrow,
  };
};
