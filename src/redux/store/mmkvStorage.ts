import {MMKV} from 'react-native-mmkv';

//create a refrence of MMKv (mobile key value storage)
export const storage = new MMKV({
  id: 'abcede124',
  encryptionKey: 'abcede23434j343jj',
});

export const mmkvStorage = {
  //set, get, delete item
  setItem: (key: string, value: string) => storage.set(key, value),
  getItem: (key: string) => storage.getString(key) ?? null,
  removeItem: (key: string) => storage.delete(key),
};
