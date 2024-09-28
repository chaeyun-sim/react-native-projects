import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface TabButtonProps {
  onPress: () => void;
  isSelected: boolean;
  activeIconName: keyof typeof Ionicons.glyphMap;
  inactiveIconName: keyof typeof Ionicons.glyphMap;
}

const TabButton = ({ onPress, isSelected, activeIconName, inactiveIconName }: TabButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }}
    >
      <Ionicons
        name={isSelected ? activeIconName : inactiveIconName}
        size={24}
        color='black'
      />
    </TouchableOpacity>
  );
};

interface TabBarProps {
  selectedTabIndex: number;
  setSelectedTabIndex: (value: number) => void;
}

export default ({ selectedTabIndex, setSelectedTabIndex }: TabBarProps) => {
  return (
    <View style={styles.tabContainer}>
      {['person', 'chatbubble', 'pricetag', 'add-circle'].map((item, idx) => (
        <TabButton
          key={item}
          isSelected={selectedTabIndex === idx}
          onPress={() => setSelectedTabIndex(idx)}
          activeIconName={item as keyof typeof Ionicons.glyphMap}
          inactiveIconName={(item + '-outline') as keyof typeof Ionicons.glyphMap}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: 'lightgray',
  },
});
