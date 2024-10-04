import { Image, Modal, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { ImageItem } from '../types/types';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useRecoilValue } from 'recoil';
import { selectedImageState } from '../store/store';

interface BigImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPressLeftButton: () => void;
  onPressRightButton: () => void;
  showPreviousArrow: boolean;
  showNextArrow: boolean;
}

export default ({
  isOpen,
  onClose,
  onPressLeftButton,
  onPressRightButton,
  showPreviousArrow,
  showNextArrow,
}: BigImageModalProps) => {
  const selectedImage = useRecoilValue(selectedImageState);

  const ArrowButton = ({
    name,
    onPress,
    show,
  }: {
    name: string;
    onPress: () => void;
    show: boolean;
  }) => {
    return (
      <TouchableOpacity
        disabled={!show}
        style={{
          height: '70%',
          paddingHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={onPress}
      >
        <SimpleLineIcons
          name={name as 'arrow-left' | 'arrow-right'}
          size={20}
          color={show ? 'white' : '#606060'}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType='fade'
      transparent
      visible={isOpen}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000c5',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableWithoutFeedback>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ArrowButton
                name='arrow-left'
                onPress={onPressLeftButton}
                show={showPreviousArrow}
              />
              <Image
                source={{ uri: selectedImage?.uri }}
                style={{ width: 270, height: 270 }}
                resizeMode='contain'
              />
              <ArrowButton
                name='arrow-right'
                onPress={onPressRightButton}
                show={showNextArrow}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
