import { View } from 'react-native';

export default function HeaderGroup({ children }) {
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </View>
  );
}
