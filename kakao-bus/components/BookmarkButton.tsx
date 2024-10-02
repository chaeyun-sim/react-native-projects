import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBookmark } from '@/hooks/useBookmark';
import { ThemeContext } from '@/hooks/context';
import { useContext } from 'react';

interface BookmarkButtonProps {
  isBookmarked: boolean;
  style?: StyleProp<ViewStyle>;
  size?: number;
}

export default ({ isBookmarked, style, size }: BookmarkButtonProps) => {
  const { bookmark, toggleBookmark } = useBookmark(isBookmarked);
  const COLOR = useContext(ThemeContext);

  return (
    <TouchableOpacity
      onPress={toggleBookmark}
      style={style}
    >
      <Ionicons
        name='star'
        size={size || 24}
        color={bookmark ? COLOR.YELLOW : COLOR.GRAY[100]}
      />
    </TouchableOpacity>
  );
};
