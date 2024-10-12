import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import HistoryListScreen from '../screens/HistoryListScreen';
import TabIcon from '../components/common/TabIcon';

const Tabs = createBottomTabNavigator();

export default () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => {
        return {
          headerShown: false,
          tabBarIcon: ({ focused, color }) => {
            const getIconName = () => {
              if (route.name === 'Home') return 'home';
              return 'time';
            };
            return (
              <TabIcon
                iconName={focused ? getIconName() : `${getIconName()}-outline`}
                iconColor={color}
              />
            );
          },
        };
      }}
    >
      <Tabs.Screen
        name='Home'
        component={HomeScreen}
      />
      <Tabs.Screen
        name='History'
        component={HistoryListScreen}
      />
    </Tabs.Navigator>
  );
};
