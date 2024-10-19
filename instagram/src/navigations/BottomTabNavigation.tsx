import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabIcon from '../components/common/TabIcon';
import HomeScreen from '../screens/HomeScreen';
import MyPageScreen from '../screens/MyPageScreen';

export type BottomTabParamsList = {
  Home: undefined;
  MyPage: undefined;
};

const Tabs = createBottomTabNavigator<BottomTabParamsList>();

export default function BottomTabNavigation() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => {
        const getIconName = () => {
          if (route.name === 'MyPage') {
            return 'person';
          }
          return 'home';
        };

        return {
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              iconName={focused ? getIconName() : `${getIconName()}-outline`}
              iconColor={color}
              isBadgeVisible={false}
            />
          ),
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'black',
        };
      }}
    >
      <Tabs.Screen
        name='Home'
        component={HomeScreen}
      />
      <Tabs.Screen
        name='MyPage'
        component={MyPageScreen}
      />
    </Tabs.Navigator>
  );
}
