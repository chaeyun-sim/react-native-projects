import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { ImageItem } from '../types/types';
import { AntDesign } from '@expo/vector-icons';

interface RenderImageProps {
  item: ImageItem;
  onPressOpenGallery: () => void;
  onLongPress: (id: number) => void;
  onPressImage: (value: ImageItem) => void;
  numColumns: number;
}

export default ({
  item,
  onPressOpenGallery,
  onLongPress,
  onPressImage,
  numColumns,
}: RenderImageProps) => {
  const WIDTH = Dimensions.get('screen').width;
  const COLUMN_SIZE = (WIDTH - 6) / numColumns;

  if (item.id === -1) {
    return (
      <TouchableOpacity
        onLongPress={() => onLongPress(item.id)}
        style={{
          backgroundColor: 'lightgrey',
          width: COLUMN_SIZE,
          height: COLUMN_SIZE,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={onPressOpenGallery}
      >
        <AntDesign
          name='plus'
          size={30}
          color='black'
        />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => onPressImage(item)}
      onLongPress={() => onLongPress(item.id)}
    >
      <Image
        source={{ uri: item.uri }}
        style={{ width: COLUMN_SIZE, height: COLUMN_SIZE }}
      />
    </TouchableOpacity>
  );
};
