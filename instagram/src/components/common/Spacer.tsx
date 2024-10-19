import { View } from 'react-native';

interface SpacerProps {
  space: number;
  horizontal?: boolean;
}

export default function Spacer({ space, horizontal }: SpacerProps) {
  return horizontal ? (
    <View style={{ marginLeft: space }}></View>
  ) : (
    <View style={{ marginTop: space }}></View>
  );
}
