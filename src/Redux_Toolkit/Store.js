import {configureStore} from '@reduxjs/toolkit';
import authSlice from './Reducer/auth.slice.js';
import Color_app from './Reducer/color_App.js';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    colorApp: Color_app,
  },
});
