import { View } from 'react-native';

export default function Spacer({ space, horizontal }) {
  return horizontal ? (
    <View style={{ marginLeft: space }}></View>
  ) : (
    <View style={{ marginTop: space }}></View>
  );
}
