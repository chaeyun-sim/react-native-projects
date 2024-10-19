import { View } from 'react-native';

import Badge from './Badge';
import Icons from './Icons';

interface TabIconProps {
  iconName: string;
  isBadgeVisible?: boolean;
  iconColor?: string;
}

export default function TabIcon({ iconName, isBadgeVisible, iconColor }: TabIconProps) {
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
