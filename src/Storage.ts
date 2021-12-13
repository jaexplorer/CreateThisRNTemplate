import AsyncStorage from '@react-native-async-storage/async-storage';

export enum StorageKey {
  AUTH_TOKEN = 'AUTH_ID_TOKEN',
  APP_THEME = 'APP_THEME',
}

export async function getItem(id: StorageKey): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(id);
  } catch (error) {
    console.warn(error);
    return null;
  }
}

export async function setItem(id: StorageKey, value: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(id, value);
    return true;
  } catch (error) {
    console.warn(error);
    return false;
  }
}

export async function removeItem(id: StorageKey): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(id);
    return true;
  } catch (error) {
    console.warn(error);
    return false;
  }
}
