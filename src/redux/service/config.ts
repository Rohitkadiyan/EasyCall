import {Platform} from 'react-native';

//For Simulator & Emulator
export const BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:3000/user'
    : 'http://localhost:3000/user';

//Physical Devices
// export const BASE_URL = 'https://192.168.1.15:3000/user';
