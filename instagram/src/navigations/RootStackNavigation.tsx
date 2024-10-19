import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';

import AddFeeScreen from '../screens/AddFeedScreen';
import FeedListScreen from '../screens/FeedListScreen';

import BottomTabNavigation from './BottomTabNavigation';

export type RootStackParamList = {
  BottomTab: undefined;
  FeedList: {
    list: {
      id: string;
      content: string;
      writer: string;
      imageUrl: string;
      likeCount: number;
    }[];
  };
  AddFeed: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='BottomTab'
        component={BottomTabNavigation}
      />
      <Stack.Screen
        name='FeedList'
        component={FeedListScreen}
      />
      <Stack.Screen
        name='AddFeed'
        component={AddFeeScreen}
      />
    </Stack.Navigator>
  );
}

export const useRootNavigation = <RouteName extends keyof RootStackParamList>() => {
  return useNavigation<NativeStackNavigationProp<RootStackParamList, RouteName>>();
};

export const useRootRoute = <RouteName extends keyof RootStackParamList>() => {
  return useRoute<RouteProp<RootStackParamList, RouteName>>();
};
