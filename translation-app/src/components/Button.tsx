import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  isSelected: boolean;
  text: string;
}

export default ({ onPress, isSelected, text }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button_container, isSelected && styles.button_container_active]}
    >
      <Text style={styles.button_text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button_container: {
    backgroundColor: '#ffffff80',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  button_container_active: {
    borderColor: '#fff',
  },
  button_text: {
    color: '#fff',
    fontSize: 16,
  },
});
