import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRefData, IRefDataModel, RefDataModel } from '../model/ref-data-model';

const refData: IRefDataModel = new RefDataModel();

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

    addLinkBlock: (
      state,
      action: PayloadAction<{
        newLinkEditableBlock: IRefData;
        currentIndex: number;
        isEnd: boolean;
      }>
    ) => {
      if (action.payload.isEnd) {
        state.post.refDataArray.push(action.payload.newLinkEditableBlock);
      } else {
        state.post.refDataArray.splice(
          action.payload.currentIndex + 1,
          0,
          action.payload.newLinkEditableBlock
        );
      }
    },

    removeLinkBlock: (
      state,
      action: PayloadAction<{ currentIndex: number }>
    ) => {
      state.post.refDataArray.splice(action.payload.currentIndex, 1);
    },
  },
});

export const { setPostData, addLinkBlock, removeLinkBlock } = postSlice.actions;
export const postReducer = postSlice.reducer;
