import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigation from './src/navigations/RootStackNavigation';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <RootStackNavigation />
      </Provider>
    </NavigationContainer>
  );
}
