import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.log(e);
  }
};

export const getToken = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
    console.log(e);
  }
};
