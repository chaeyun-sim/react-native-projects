import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import NewsDetailScreen from '../screens/NewsDetailScreen';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='NewsTab'
        component={BottomTabNavigator}
      />
      <Stack.Screen
        name='NewsDetail'
        component={NewsDetailScreen}
      />
    </Stack.Navigator>
  );
};
