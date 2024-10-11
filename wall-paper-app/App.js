import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigation from './src/navigations/RootStackNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  );
}
