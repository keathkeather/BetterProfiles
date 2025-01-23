import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const jwt = require('jsonwebtoken');
interface UserState {
  _USER_ID: string | null;
  _EMAIL: string | null;
  _USERNAME: string | null;
  userData: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  _USER_ID: null,
  _EMAIL: null,
  _USERNAME: null,
  userData: null,
  status: 'idle',
  error: null,
};

// Async thunk to fetch user data
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (token: string, { rejectWithValue }) => {
    try {
      const decodedToken: { id: string; email: string } = jwt.decode(token) as { id: string; email: string };
      if (!decodedToken || !decodedToken.id) {
        throw new Error('Invalid token');
      }
      const response = await axios.get(`http://localhost:3000/api/getUser/${decodedToken.id}`);
      return { ...response.data, email: decodedToken.email, id: decodedToken.id };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state._EMAIL = action.payload._EMAIL;
      state._USER_ID = action.payload._USER_ID;
      state._USERNAME = action.payload._USERNAME;
    },
    clearUserData: (state) => {
      state._EMAIL = null;
      state._USER_ID = null;
      state._USERNAME = null;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
        state._EMAIL = action.payload.email;
        state._USER_ID = action.payload.id;
        state._USERNAME = action.payload.username;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setEmail, clearUserData } = userSlice.actions;

export default userSlice.reducer;