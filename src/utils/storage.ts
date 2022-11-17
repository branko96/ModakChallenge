import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveItem = async (value: string, key: string) => {
  await AsyncStorage.setItem(key, value);
};

export const getItem = async (key: string) => {
  return await AsyncStorage.getItem(key);
};
