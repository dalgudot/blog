import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRefData, IRefDataModel, RefDataModel } from '../model/ref-data-model';

const refData: IRefDataModel = new RefDataModel();

// const initialState: IPostData = {
const initialState = {
  post: {
    dateTime: '',
    title: '',
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

    setArticleTitleData: (
      state,
      action: PayloadAction<{ inputPureHtml: string }>
    ) => {
      state.post.title = action.payload.inputPureHtml;
    },

    setRefTitleData: (
      state,
      action: PayloadAction<{ inputPureHtml: string; currentIndex: number }>
    ) => {
      state.post.refDataArray[action.payload.currentIndex].title =
        action.payload.inputPureHtml;
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

export const {
  setPostData,
  setArticleTitleData,
  setRefTitleData,
  addLinkBlock,
  removeLinkBlock,
} = postSlice.actions;
export const postReducer = postSlice.reducer;
