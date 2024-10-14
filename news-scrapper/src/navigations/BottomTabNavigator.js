import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewsListScreen from '../screens/NewsListScreen';
import FavoriteNewsListScreen from '../screens/FavoriteNewsListScreen';
import TabIcon from '../components/common/TabIcon';

const Tabs = createBottomTabNavigator();

export default () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          const getIconName = () => {
            if (route.name === 'FavoriteNews') {
              return 'star';
            }
            return 'home';
          };
          return (
            <TabIcon
              iconName={focused ? getIconName() : `${getIconName()}-outline`}
              iconColor={color}
            />
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'grey',
      })}
    >
      <Tabs.Screen
        name='NewsList'
        component={NewsListScreen}
      />
      <Tabs.Screen
        name='FavoriteNews'
        component={FavoriteNewsListScreen}
      />
    </Tabs.Navigator>
  );
};
