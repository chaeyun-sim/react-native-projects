import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SectionProps {
  friendProfileLen: number;
  onPress: () => void;
  isClosed: boolean;
}

export default ({ friendProfileLen, onPress, isClosed }: SectionProps) => {
  return (
    <View style={styles.section}>
      <Text style={{ color: 'grey' }}>친구 {friendProfileLen}</Text>
      <TouchableOpacity onPress={onPress}>
        <MaterialIcons
          name={isClosed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
          size={24}
          color='lightgray'
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
});
