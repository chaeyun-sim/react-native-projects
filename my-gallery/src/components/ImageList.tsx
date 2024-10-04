import { Dimensions, FlatList } from 'react-native';
import { ImageItem } from '../types/types';
import RenderImage from './RenderImage';
import { useRecoilValue } from 'recoil';
import { imagesWithAddButtonState } from '../store/store';

interface ImageListProps {
  onLongPress: (id: number) => void;
  onPressImage: (image: ImageItem) => void;
  onPressOpenGallery: () => void;
}

export default (props: ImageListProps) => {
  const width = Dimensions.get('screen').width;
  const minColumnSize = width > 500 ? 200 : 120;
  const numColumns = Math.floor(width / minColumnSize);

  const imagesWithAddButton = useRecoilValue(imagesWithAddButtonState);

  return (
    <FlatList
      data={imagesWithAddButton}
      renderItem={({ item }) => (
        <RenderImage
          item={item}
          numColumns={numColumns}
          {...props}
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
