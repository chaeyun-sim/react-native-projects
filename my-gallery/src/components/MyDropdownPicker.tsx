import { Text, TouchableOpacity, View } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AlbumItem } from '../types/types';
import { useRecoilValue } from 'recoil';
import { albumsState, modalStateAtom, selectedAlbumState } from '../store/store';

const HEADER_HEIGHT = 50;

interface MyDropdownPickerProps {
  onPressAddAlbum: () => void;
  onPressHeader: () => void;
  isOpen: boolean;
  onPressAlbum: (value: AlbumItem) => void;
  onLongPressAlbum: (id: number) => void;
}

export default ({
  isOpen,
  onPressAddAlbum,
  onPressHeader,
  onPressAlbum,
  onLongPressAlbum,
}: MyDropdownPickerProps) => {
  const selectedAlbum = useRecoilValue(selectedAlbumState);
  const albums = useRecoilValue(albumsState);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPressHeader}
        style={{
          height: HEADER_HEIGHT,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          borderBottomWidth: 0.3,
          borderBottomColor: 'lightgrey',
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{selectedAlbum.title}</Text>
        <SimpleLineIcons
          name={isOpen ? 'arrow-up' : 'arrow-down'}
          size={12}
          color='black'
          style={{ marginLeft: 8 }}
        />

        <TouchableOpacity
          onPress={onPressAddAlbum}
          style={{
            position: 'absolute',
            right: 0,
            height: HEADER_HEIGHT,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 12 }}>앨범 추가</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      {isOpen && (
        <View
          style={{
            width: '100%',
            position: 'absolute',
            top: 50,
            backgroundColor: '#fff',
            borderBottomColor: 'lightgrey',
            borderBottomWidth: 0.5,
          }}
        >
          {albums.map(album => (
            <TouchableOpacity
              key={album.id}
              activeOpacity={1}
              onPress={() => onPressAlbum(album)}
              onLongPress={() => onLongPressAlbum(album.id)}
              style={{
                paddingVertical: 12,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontWeight: album.title === selectedAlbum.title ? 'bold' : 'normal' }}>
                {album.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
