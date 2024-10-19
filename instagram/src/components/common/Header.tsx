import { PropsWithChildren } from 'react';
import { StyleProp, useWindowDimensions, View, ViewStyle } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

import Button from './Button';
import Icons from './Icons';
import Spacer from './Spacer';
import Typography from './Typography';

interface HeaderTitleProps {
  title: string;
  fontSize?: number;
}

function HeaderTitle({ title, fontSize }: HeaderTitleProps) {
  return <Typography fontSize={fontSize || 18}>{title}</Typography>;
}

function HeaderSpacer({ space }: { space: number }) {
  return <View style={{ width: space, height: space }} />;
}

function HeaderGroup({ children, style }: PropsWithChildren<{ style: StyleProp<ViewStyle> }>) {
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        ...(style as ViewStyle),
      }}
    >
      {children}
    </View>
  );
}

interface HeaderButtonProps {
  onPress: () => void;
  iconName: string;
  iconSize: number;
}

function HeaderButton({ onPress, iconName, iconSize }: HeaderButtonProps) {
  return (
    <Button onPress={onPress}>
      <Icons
        name={iconName}
        size={iconSize || 28}
        color='black'
      />
    </Button>
  );
}

export default function Header({ children }: PropsWithChildren) {
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
              alignItems: 'center',
            }}
          >
            <Spacer
              space={12}
              horizontal
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {children}
            </View>
            <Spacer
              space={12}
              horizontal
            />
          </View>
        </View>
      )}
    </SafeAreaInsetsContext.Consumer>
  );
}

Header.Title = HeaderTitle;
Header.Icon = HeaderButton;
Header.Group = HeaderGroup;
Header.Space = HeaderSpacer;
