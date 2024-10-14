import { Dimensions, View } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import Spacer from './Spacer';
import Typography from './Typography';
import Button from './Button';
import Icons from './Icons';

const { width } = Dimensions.get('screen');

function HeaderTitle({ title, fontSize }) {
  return <Typography fontSize={fontSize || 18}>{title}</Typography>;
}

function HeaderSpacer({ space }) {
  return <View style={{ width: space, height: space }} />;
}

function HeaderGroup({ children, style }) {
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
    >
      {children}
    </View>
  );
}

function HeaderButton({ onPress, iconName, iconSize }) {
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

export default function Header({ children }) {
  return (
    <SafeAreaInsetsContext.Consumer>
      {insets => (
        <View style={{ paddingTop: insets.top }}>
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
