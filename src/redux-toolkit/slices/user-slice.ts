import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Tuid = string | undefined;

interface IUser {
  uid: Tuid;
}

const initialState: IUser = {
  uid: undefined,
};

// Official documents
// https://redux-toolkit.js.org/tutorials/typescript
// https://redux-toolkit.js.org/api/createslice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // PayloadAction<T>
    setUid: (state, action: PayloadAction<Tuid>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.uid = action.payload;
    },
  },
});

export const { setUid } = userSlice.actions;
export const userReducer = userSlice.reducer;
