import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigator from './src/navigations/RootStackNavigator';
import { RecoilRoot } from 'recoil';
import { RecoilCustomPersist } from './src/components/RecoilCustomPersist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <RecoilRoot>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <NavigationContainer>
            <RecoilCustomPersist>
              <RootStackNavigator />
            </RecoilCustomPersist>
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </RecoilRoot>
  );
}
