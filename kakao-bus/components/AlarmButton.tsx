import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { ThemeContext } from '@/hooks/context';

interface AlarmButtonProps {
  onPress: () => void;
  style: StyleProp<ViewStyle>;
}

export default ({ onPress, style }: AlarmButtonProps) => {
  const COLOR = useContext(ThemeContext);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
    >
      <Ionicons
        name='alarm-outline'
        size={24}
        color={COLOR.GRAY[200]}
      />
    </TouchableOpacity>
  );
};
