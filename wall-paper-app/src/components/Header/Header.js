import { Dimensions, View } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import Spacer from '../common/Spacer';
import HeaderTitle from './HeaderTitle';
import HeaderButton from './HeaderButton';
import HeaderGroup from './HeaderGroup';

const { width } = Dimensions.get('screen');

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
