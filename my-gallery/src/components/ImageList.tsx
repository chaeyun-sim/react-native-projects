import { Dimensions, FlatList } from 'react-native';
import { ImageItem } from '../types/types';
import RenderImage from './RenderImage';

interface ImageListProps {
  imagesWithAddButton: ImageItem[];
  onLongPress: (id: number) => void;
  onPressImage: (image: ImageItem) => void;
  onPressOpenGallery: () => void;
}

export default ({ imagesWithAddButton, ...rest }: ImageListProps) => {
  const width = Dimensions.get('screen').width;
  const minColumnSize = width > 500 ? 200 : 120;
  const numColumns = Math.floor(width / minColumnSize);

  return (
    <FlatList
      data={imagesWithAddButton as ImageItem[]}
      renderItem={({ item }) => (
        <RenderImage
          item={item}
          numColumns={numColumns}
          {...rest}
        />
      )}
      keyExtractor={item => String(item.id)}
      numColumns={numColumns}
      columnWrapperStyle={{ gap: 3 }}
      contentContainerStyle={{ gap: 3 }}
      style={{ zIndex: -1 }}
    />
  );
};
