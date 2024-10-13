import AddLinkScreen from '../screens/AddLinkScreen';
import LinkStackNavigator from './LinkStackNavigator';

const { createNativeStackNavigator } = require('@react-navigation/native-stack');

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName='LinkStack'
      screenOptions={{ presentation: 'containerModal', headerShown: false }}
    >
      <Stack.Screen
        name='LinkStack'
        component={LinkStackNavigator}
      />
      <Stack.Screen
        name='AddLink'
        component={AddLinkScreen}
      />
    </Stack.Navigator>
  );
};
