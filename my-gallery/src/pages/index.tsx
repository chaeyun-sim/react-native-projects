import { StyleSheet, SafeAreaView, Platform } from 'react-native';
import { useGallery } from '../hooks/useGallery';
import { AlbumItem, ImageItem } from '../types/types';

import MyDropdownPicker from '../components/MyDropdownPicker';
import TextInputModal from '../components/TextInputModal';
import BigImageModal from '../components/BigImageModal';
import ImageList from '../components/ImageList';

export default function HomeScreen() {
  const {
    pickImage,
    deleteImage,
    imagesWithAddButton,
    selectedAlbum,
    isModalOpen,
    openInputModal,
    closeInputModal,
    newAlbumTitle,
    setNewAlbumTitle,
    addAlbum,
    resetNewAlbumTitle,
    openDropdown,
    closeDropdown,
    albums,
    selectAlbum,
    deleteAlbum,
    openBigImgModal,
    closeBigImgModal,
    selectImage,
    selectedImage,
    moveToPrevImage,
    moveToNextImage,
    showPreviousArrow,
    showNextArrow,
  } = useGallery();

  const onSubmitEditing = () => {
    if (!newAlbumTitle) return;

    addAlbum();
    closeInputModal();
    resetNewAlbumTitle();
  };

  const onPressHeader = () => (isModalOpen.isDropdownOpen ? closeDropdown() : openDropdown());

  const onPressAlbum = (album: AlbumItem) => {
    selectAlbum(album);
    closeDropdown();
  };

  return (
    <SafeAreaView style={styles.container}>
      <MyDropdownPicker
        selectedAlbumTitle={selectedAlbum.title}
        onPressAddAlbum={openInputModal}
        onPressHeader={onPressHeader}
        isOpen={isModalOpen.isDropdownOpen}
        albums={albums}
        onPressAlbum={onPressAlbum}
        onLongPressAlbum={deleteAlbum}
      />
      <TextInputModal
        isOpen={isModalOpen.isInputModalOpen}
        onClose={closeInputModal}
        newAlbumTitle={newAlbumTitle}
        setNewAlbumTitle={setNewAlbumTitle}
        onSubmitEditing={onSubmitEditing}
      />
      <BigImageModal
        isOpen={isModalOpen.isBigImgModalOpen}
        onClose={closeBigImgModal}
        selectedImage={selectedImage!}
        onPressLeftButton={moveToPrevImage}
        onPressRightButton={moveToNextImage}
        showPreviousArrow={showPreviousArrow}
        showNextArrow={showNextArrow}
      />
      <ImageList
        imagesWithAddButton={imagesWithAddButton as ImageItem[]}
        onLongPress={deleteImage}
        onPressImage={(image: ImageItem) => {
          openBigImgModal();
          selectImage(image);
        }}
        onPressOpenGallery={pickImage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'android' ? 30 : 0,
  },
});
