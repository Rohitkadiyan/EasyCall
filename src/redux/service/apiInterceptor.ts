import axios from 'axios';
import {mmkvStorage, storage} from '../store/mmkvStorage';
import {resetAndNavigate} from '../../utils/NavigationUtils';
import {MMKVStorage, Routes} from '../../utils/Constants';
import {Alert} from 'react-native';
import {BASE_URL} from './config';

export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

//request
AxiosInstance.interceptors.request.use(async config => {
  const accessToken = mmkvStorage.getItem(MMKVStorage.ACCESS_TOKEN);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

//response
AxiosInstance.interceptors.response.use(
  res => res,
  async error => {
    if (error.response && error.response.status === 401) {
      resetAndNavigate(Routes.AUTH);
      Alert.alert('Session Experied ! ');
      console.log(error);
      storage.clearAll();
    }
  },
);
