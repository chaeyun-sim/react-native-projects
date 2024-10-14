import { View } from 'react-native';
import Typography from './Typography';

export default function Badge({ children, fontSize }) {
  return (
    <View>
      <View>
        {children}
        <View
          style={{
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: -15,
            top: -5,
          }}
        >
          <Typography
            fontSize={fontSize}
            color='white'
          >
            N
          </Typography>
        </View>
      </View>
    </View>
  );
}
