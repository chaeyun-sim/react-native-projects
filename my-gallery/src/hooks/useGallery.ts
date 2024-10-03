import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { AlbumItem, ImageItem } from '../types/types';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultAlbum: AlbumItem = {
  id: -1,
  title: '기본 앨범',
};

export const useGallery = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumItem>(defaultAlbum);
  const [albums, setAlbums] = useState<AlbumItem[]>([defaultAlbum]);
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBigImgModalOpen, setIsBigImgModalOpen] = useState(false);
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState<ImageItem>();

  useEffect(() => {
    initValues();
  }, []);

  const initValues = async () => {
    const imagesFromStorage = await AsyncStorage.getItem('@images');
    if (imagesFromStorage) setImages(JSON.parse(imagesFromStorage));

    const albumsFromStorage = await AsyncStorage.getItem('@albums');
    if (albumsFromStorage) setAlbums(JSON.parse(albumsFromStorage));
  };

  const _setImages = (newImages: ImageItem[]) => {
    setImages(newImages);
    AsyncStorage.setItem('@images', JSON.stringify(newImages));
  };

  const _setAlbums = (newAlbums: AlbumItem[]) => {
    setAlbums(newAlbums);
    AsyncStorage.setItem('@images', JSON.stringify(newAlbums));
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

  const filteredImages = images.filter(el => el.albumId === selectedAlbum.id);
  const imagesWithAddButton = [
    ...filteredImages,
    {
      id: -1,
      uri: '',
    },
  ];

  const openInputModal = () => setIsInputModalOpen(true);
  const closeInputModal = () => setIsInputModalOpen(false);
  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);
  const openBigImgModal = () => setIsBigImgModalOpen(true);
  const closeBigImgModal = () => setIsBigImgModalOpen(false);

  const addAlbum = () => {
    const newAlbum = {
      id: albums.length + 1,
      title: newAlbumTitle,
    };
    _setAlbums([...albums, newAlbum]);
    setSelectedAlbum(newAlbum);
  };

  const resetNewAlbumTitle = () => setNewAlbumTitle('');

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
          closeDropdown();
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
    imagesWithAddButton,
    selectedAlbum,
    isInputModalOpen,
    openInputModal,
    closeInputModal,
    isDropdownOpen,
    openDropdown,
    closeDropdown,
    isBigImgModalOpen,
    openBigImgModal,
    closeBigImgModal,
    newAlbumTitle,
    setNewAlbumTitle,
    addAlbum,
    resetNewAlbumTitle,
    albums,
    selectAlbum,
    deleteAlbum,
    selectImage,
    selectedImage,
    moveToPrevImage,
    moveToNextImage,
    showPreviousArrow,
    showNextArrow,
  };
};
