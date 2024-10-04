import { Text, TouchableOpacity } from 'react-native';

export default ({ title, onPress }: { title: string; onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};
