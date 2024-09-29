import { SimpleLineIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default ({ onPress, name }: { onPress: () => void; name: string }) => {
  return (
    <TouchableOpacity
      style={{ paddingHorizontal: 20, paddingVertical: 15 }}
      onPress={onPress}
    >
      <SimpleLineIcons
        name={name as 'arrow-left' | 'arrow-right'}
        size={15}
        color='#404040'
      />
    </TouchableOpacity>
  );
};
