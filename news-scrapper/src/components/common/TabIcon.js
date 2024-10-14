import { View } from 'react-native';
import Badge from './Badge';
import Icons from './Icons';

export default function TabIcon({ iconName, isBadgeVisible, iconColor }) {
  return isBadgeVisible ? (
    <View>
      <Badge fontSize={10}>
        <Icons
          name={iconName}
          size={25}
          color={iconColor || 'black'}
        />
      </Badge>
    </View>
  ) : (
    <View>
      <Icons
        name={iconName}
        size={25}
        color={iconColor || 'black'}
      />
    </View>
  );
}
