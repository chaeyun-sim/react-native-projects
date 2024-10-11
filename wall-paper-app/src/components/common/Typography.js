import { Text } from 'react-native';

export default function Typography({ color, fontSize, children }) {
  return <Text style={{ color, fontSize }}>{children}</Text>;
}
