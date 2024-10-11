import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ImageListScreen from '../screen/ImageListScreen';
import FavoriteImageListScreen from '../screen/FavoriteImageListScreen';
import TabIcon from '../components/common/TabIcon';

const Tabs = createBottomTabNavigator();

export default () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          const getIconName = () => {
            if (route.name === 'ImageList') return 'home';
            else if (route.name === 'FavoriteImageList') return 'star';
          };
          return (
            <TabIcon
              iconName={focused ? getIconName() : `${getIconName()}-outline`}
              iconColor={color}
            />
          );
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'grey',
      })}
    >
      <Tabs.Screen
        name='ImageList'
        component={ImageListScreen}
      />
      <Tabs.Screen
        name='FavoriteImageList'
        component={FavoriteImageListScreen}
      />
    </Tabs.Navigator>
  );
};
