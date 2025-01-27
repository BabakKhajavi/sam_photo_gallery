import { createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from '@/types/props/category.types';
import { CategoryAsyncThunk } from '@/types/props/menu.types';
import { API } from '@/utils/api';
export const getCategories: CategoryAsyncThunk = createAsyncThunk(
  'auth/login',
  async (_, thunkApi) => {
    try {
      const api = new API();
      const categories = await api.get(`category/find`, {
        cache: 'force-cache',
      });
      return categories as Category[];
    } catch (error: any) {
      if (typeof error.response === 'undefined') {
        return thunkApi.rejectWithValue({
          message: 'Something went wrong: Network Error (Cors Origin)',
        });
      } else if (error?.response?.data) {
        return thunkApi.rejectWithValue(error?.response?.data);
      } else {
        return thunkApi.rejectWithValue({
          message: 'Something went wrong: Unkown Reason ',
        });
      }
    }
  },
);
