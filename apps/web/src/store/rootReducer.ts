import { combineReducers } from '@reduxjs/toolkit';
import menuReducer from '@/app/layout/sidemenu/menuSlice';
const rootReducer = combineReducers({ menuReducer });

export default rootReducer;
