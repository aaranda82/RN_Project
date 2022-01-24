import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value);
  } catch (e) {
    // saving error
  }
};

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key');
    if (value !== null) {
      // value previously stored
      console.log(value);
    }
  } catch (e) {
    // error reading value
  }
};
