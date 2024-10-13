import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorage = async key => await AsyncStorage.getItem(key);
export const setStorage = async (key, value) => await AsyncStorage.setItem(key, value);
export const removeStorage = async key => await AsyncStorage.removeItem(key);
