import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRefData, RefData } from '../model/ref-data';

const refData = new RefData();

// const initialState: IPostData = {
const initialState = {
  post: {
    refDataArray: [refData.createNewRefData()],
  },
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostData: (state, action: PayloadAction<any>) => {
      state.post = action.payload;
    },

    addLinkBlock: (state, action: PayloadAction<IRefData>) => {
      state.post.refDataArray.push(action.payload);
    },
  },
});

export const { setPostData, addLinkBlock } = postSlice.actions;
export const postReducer = postSlice.reducer;
