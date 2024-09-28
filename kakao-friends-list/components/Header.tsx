import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IconButton = ({ name }: { name: string }) => {
  return (
    <TouchableOpacity
      hitSlop={{ top: 15, bottom: 15 }}
      style={{ paddingHorizontal: 6 }}
    >
      <Ionicons
        name={name as keyof typeof Ionicons.glyphMap}
        size={24}
        color='black'
      />
    </TouchableOpacity>
  );
};

export default () => {
  return (
    <View style={styles.header}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>친구</Text>
      <View style={{ flexDirection: 'row' }}>
        {['search', 'person-add', 'musical-notes', 'settings'].map(name => (
          <IconButton
            key={name}
            name={name + '-outline'}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: 'white',
    marginBottom: 10,
  },
});
