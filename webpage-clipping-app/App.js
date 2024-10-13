import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigator from './src/navigations/RootStackNavigator';
import { RecoilRoot } from 'recoil';
import { RecoilCustomPersist } from './src/components/RecoilCustomPersist';

export default function App() {
  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <NavigationContainer>
          <RecoilCustomPersist>
            <RootStackNavigator />
          </RecoilCustomPersist>
        </NavigationContainer>
      </SafeAreaProvider>
    </RecoilRoot>
  );
}
