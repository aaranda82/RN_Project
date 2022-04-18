import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN } from '../constants';

export type TokenTypes = 'ACCESS_TOKEN' | 'REFRESH_TOKEN';

export const storeTokens = async (
  accessToken: string,
  refreshToken: string,
) => {
  try {
    await AsyncStorage.multiSet([
      [TOKEN.access, accessToken],
      [TOKEN.refresh, refreshToken],
    ]);
  } catch (e) {
    // saving error
    console.log(e);
  }
};

export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(TOKEN.access, token);
  } catch (e) {
    console.log(e);
  }
};

export const getToken = async (key: TokenTypes) => {
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

export const removeTokens = async () => {
  try {
    await AsyncStorage.multiRemove([TOKEN.access, TOKEN.refresh]);
  } catch (e) {
    console.log(e);
  }
};
