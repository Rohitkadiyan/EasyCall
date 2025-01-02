import {createSlice} from '@reduxjs/toolkit';

//state type //
interface userStateType {
  user: any | null;
  accessToken: string | null;
  refreshToken: string | null;
}

//initial Values
const initialState: userStateType = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //setUserData
    setUserData: (state, action) => {
      console.log(action, 'action');
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },

    //Clear User Data
    clearUserData: state => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

//export action
export const {setUserData, clearUserData} = authSlice.actions;

//export reducer
export default authSlice.reducer;
