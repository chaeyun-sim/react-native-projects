import { StyleSheet, SafeAreaView, Platform } from 'react-native';
import { useGallery } from '../hooks/useGallery';
import { AlbumItem, ImageItem } from '../types/types';
import MyDropdownPicker from '../components/MyDropdownPicker';
import TextInputModal from '../components/TextInputModal';
import BigImageModal from '../components/BigImageModal';
import ImageList from '../components/ImageList';
import { useRecoilState } from 'recoil';
import { modalStateAtom, newAlbumTitleState } from '../store/store';

export default function HomeScreen() {
  const [newAlbumTitle, setNewAlbumTitle] = useRecoilState(newAlbumTitleState);
  const [modalState, setModalState] = useRecoilState(modalStateAtom);

  const {
    selectImage,
    pickImage,
    deleteImage,
    selectAlbum,
    addAlbum,
    deleteAlbum,
    moveToPrevImage,
    moveToNextImage,
    showPreviousArrow,
    showNextArrow,
  } = useGallery();

  const setInputModal = (type: 'open' | 'close') => {
    setModalState({ ...modalState, isInputModalOpen: type === 'open' });
  };

  const setDropdownModal = (type: 'open' | 'close') => {
    setModalState({ ...modalState, isDropdownOpen: type === 'open' });
  };

  const setBigImgModal = (type: 'open' | 'close') => {
    setModalState({ ...modalState, isBigImgModalOpen: type === 'open' });
  };

  const onSubmitEditing = () => {
    if (!newAlbumTitle) return;

    addAlbum();
    setInputModal('close');
    setNewAlbumTitle('');
  };

  const onPressHeader = () =>
    modalState.isDropdownOpen ? setDropdownModal('close') : setDropdownModal('open');

  const onPressAlbum = (album: AlbumItem) => {
    selectAlbum(album);
    setDropdownModal('close');
  };

  const onPressImage = (image: ImageItem) => {
    setBigImgModal('open');
    selectImage(image);
  };

  return (
    <SafeAreaView style={styles.container}>
      <MyDropdownPicker
        isOpen={modalState.isDropdownOpen}
        onPressAddAlbum={() => setInputModal('open')}
        onPressHeader={onPressHeader}
        onPressAlbum={onPressAlbum}
        onLongPressAlbum={deleteAlbum}
      />
      <TextInputModal
        isOpen={modalState.isInputModalOpen}
        onClose={() => setInputModal('close')}
        onSubmitEditing={onSubmitEditing}
      />
      <BigImageModal
        isOpen={modalState.isBigImgModalOpen}
        onClose={() => setBigImgModal('close')}
        onPressLeftButton={moveToPrevImage}
        onPressRightButton={moveToNextImage}
        showPreviousArrow={showPreviousArrow}
        showNextArrow={showNextArrow}
      />
      <ImageList
        onLongPress={deleteImage}
        onPressImage={onPressImage}
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
