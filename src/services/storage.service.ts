import { AsyncStorage } from 'react-native';

const AUTH_USER_ID = 'AUTH_USER_ID';
const USE_TOUCH_ID = 'USE_TOUCH_ID';
const PHONE_TOKEN = 'PHONE_TOKEN';

// USE TOUCH ID
export const setStorageUseTouchId = (useTouchId: boolean): Promise<void> => {
  return AsyncStorage.setItem(USE_TOUCH_ID, JSON.stringify(useTouchId));
};

export const getStorageUseTouchId = async (): Promise<boolean> => {
  const storageData: string = await AsyncStorage.getItem(USE_TOUCH_ID);
  return JSON.parse(storageData);
};

export const removeStorageUseTouchId = async (): Promise<void> => {
  return AsyncStorage.removeItem(USE_TOUCH_ID);
};

// AUTH USER
export const setStorageAuthUserId = (authUserId: string): Promise<void> => {
  return AsyncStorage.setItem(AUTH_USER_ID, authUserId);
};

export const getStorageAuthUserId = async (): Promise<string> => {
  return  AsyncStorage.getItem(AUTH_USER_ID);
};

export const removeStorageAuthUserId = async (): Promise<void> => {
  return AsyncStorage.removeItem(AUTH_USER_ID);
};

// AUTH USER
export const setStoragePhoneToken = (phoneToken: string): Promise<void> => {
  return AsyncStorage.setItem(PHONE_TOKEN, phoneToken);
};

export const getStoragePhoneToken = async (): Promise<string> => {
  return AsyncStorage.getItem(PHONE_TOKEN);
};

export const removeStoragePhoneToken = async (): Promise<void> => {
  return AsyncStorage.removeItem(PHONE_TOKEN);
};
