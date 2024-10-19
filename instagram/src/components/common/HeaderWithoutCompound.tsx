import { useWindowDimensions, View } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

import Button from './Button';
import Icons from './Icons';
import Spacer from './Spacer';
import Typography from './Typography';

interface HeaderWithoutCompoundProps {
  leftIcon: { iconName: string; onPress: () => void };
  rightIcon: { iconName: string; onPress: () => void };
  title: string;
}

export default function HeaderWithoutCompound({
  leftIcon,
  rightIcon,
  title,
}: HeaderWithoutCompoundProps) {
  const { width } = useWindowDimensions();

  return (
    <SafeAreaInsetsContext.Consumer>
      {insets => (
        <View style={{ paddingTop: insets?.top }}>
          <View
            style={{
              width,
              height: 56,
              flexDirection: 'row',
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
            }}
          >
            <Spacer
              space={12}
              horizontal
            />
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {leftIcon && (
                  <Button onPress={leftIcon.onPress}>
                    <Icons
                      name={leftIcon.iconName}
                      size={28}
                    />
                  </Button>
                )}

                <Typography fontSize={18}>{title}</Typography>
              </View>
              {rightIcon && (
                <Button onPress={rightIcon.onPress}>
                  <Icons
                    name={rightIcon.iconName}
                    size={28}
                  />
                </Button>
              )}
            </View>
          </View>
        </View>
      )}
    </SafeAreaInsetsContext.Consumer>
  );
}
