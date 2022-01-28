import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

export type TUid = string | null;

interface IUser {
  user: User | null;
  uid: TUid;
}

const initialState: IUser = {
  user: null,
  uid: null,
};

export const userAuthSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },

    setUid: (state, action: PayloadAction<TUid>) => {
      state.uid = action.payload;
    },
  },
});

export const { setUser, setUid } = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;
