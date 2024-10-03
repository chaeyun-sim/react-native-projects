import {
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Platform,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import { useGallery } from './src/hooks/useGallery';
import { AlbumItem, ImageItem } from './src/types/types';

import MyDropdownPicker from './src/components/MyDropdownPicker';
import TextInputModal from './src/components/TextInputModal';
import BigImageModal from './src/components/BigImageModal';
import RenderImage from './src/components/RenderImage';
import ImageList from './src/components/ImageList';

export default function App() {
  const {
    pickImage,
    deleteImage,
    imagesWithAddButton,
    selectedAlbum,
    isInputModalOpen,
    openInputModal,
    closeInputModal,
    newAlbumTitle,
    setNewAlbumTitle,
    addAlbum,
    resetNewAlbumTitle,
    isDropdownOpen,
    openDropdown,
    closeDropdown,
    albums,
    selectAlbum,
    deleteAlbum,
    isBigImgModalOpen,
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

  const onPressHeader = () => (isDropdownOpen ? closeDropdown() : openDropdown());

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
        isOpen={isDropdownOpen}
        albums={albums}
        onPressAlbum={onPressAlbum}
        onLongPressAlbum={deleteAlbum}
      />
      <TextInputModal
        isOpen={isInputModalOpen}
        onClose={closeInputModal}
        newAlbumTitle={newAlbumTitle}
        setNewAlbumTitle={setNewAlbumTitle}
        onSubmitEditing={onSubmitEditing}
      />
      <BigImageModal
        isOpen={isBigImgModalOpen}
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
        onPressImage={image => {
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
