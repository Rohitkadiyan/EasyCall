import {MMKVStorage} from './../../utils/Constants';
import {BASE_URL} from './config';
import {storage} from '../store/mmkvStorage';
import {AppDispatch} from '../store/store';
import {setUserData} from '../slices/authSlice';
import {AxiosInstance} from './apiInterceptor';
import axios from 'axios';
import {Alert} from 'react-native';

//Login
export const login =
  async (phoneNumber: number) => async (dispatch: AppDispatch) => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, {phoneNumber});
      console.log(res?.data, 'response');
      const {accessToken, refreshToken, user} = res?.data;
      console.log(user, 'userData');
      storage.set(MMKVStorage.ACCESS_TOKEN, String(accessToken));
      storage.set(MMKVStorage.REFRESH_TOKEN, String(refreshToken));
      storage.set(MMKVStorage.USER, JSON.stringify(user));

      //save in Redux
      dispatch(setUserData({user, accessToken, refreshToken}));
      return res?.data;
    } catch (err) {
      console.log('Login Error', err);
      throw err;
    }
  };

//SignUp
export const signUp =
  async (phoneNumber: number, email: string, name: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await axios.post(`${BASE_URL}/signup`, {
        phoneNumber,
        email,
        name,
      });

      const {accessToken, refreshToken, user} = res?.data;
      storage.set(MMKVStorage.ACCESS_TOKEN, String(accessToken));
      storage.set(MMKVStorage.REFRESH_TOKEN, String(refreshToken));

      //save in Redux
      dispatch(setUserData({user, accessToken, refreshToken}));
      return res?.data;
    } catch (err) {
      console.log('Signup Error', err);
      throw err;
    }
  };

//FindUser
export const findUser = async (phoneNumber: number) => {
  try {
    const res = await AxiosInstance.get(`${BASE_URL}/${phoneNumber}`);
    // console.log(res?.data, 'findUser');
    return res?.data;
  } catch (err) {
    console.log('Login Error', err);
    throw err;
  }
};

//add Multiple Contacts
export const addMultipleContacts = async (users: any) => {
  try {
    const res = await AxiosInstance.post(`${BASE_URL}/add-multiple`, {users});
    console.log(res?.data, 'multipleContacts');
    return res?.data;
  } catch (err) {
    console.log('Login Error', err);
    throw err;
  }
};

//reportSpam
export const reportSpam = async (phoneNumber: any) => {
  try {
    const res = await AxiosInstance.put(`${BASE_URL}/report/${phoneNumber}`);
    Alert.alert('User reported as spam');
    return res?.data;
  } catch (err) {
    console.log('Spam Error', err);
    throw err;
  }
};
