import {configureStore} from '@reduxjs/toolkit';
import authSlice from './Reducer/auth.slice.js';
import Color_app from './Reducer/color_App.js';
import statusUser from './Reducer/status.User.js';
export const store = configureStore({
  reducer: {
    auth: authSlice,
    colorApp: Color_app,
    statusUser: statusUser,
  },
});
