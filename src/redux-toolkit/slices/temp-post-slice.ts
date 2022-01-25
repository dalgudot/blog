import { IRefDataModel } from './../model/ref-data';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRefData, RefDataModel } from '../model/ref-data';

const refData: IRefDataModel = new RefDataModel();

// const initialState: IPostData = {
const initialState = {
  tempPost: {
    refDataArray: [refData.createNewRefData()],
  },
};

export const tempPostSlice = createSlice({
  name: 'tempPost',
  initialState,
  reducers: {
    setTempPostData: (state, action: PayloadAction<any>) => {
      state.tempPost = action.payload;
    },

    setTempRefTitleData: (
      state,
      action: PayloadAction<{ inputHtml: string; currentIndex: number }>
    ) => {
      state.tempPost.refDataArray[action.payload.currentIndex].title =
        action.payload.inputHtml;
    },

    setTempRefUrlData: (
      state,
      action: PayloadAction<{ data: string; currentIndex: number }>
    ) => {
      state.tempPost.refDataArray[action.payload.currentIndex].url =
        action.payload.data;
    },

    addTempLinkBlock: (
      state,
      action: PayloadAction<{
        newLinkEditableBlock: IRefData;
        currentIndex: number;
        isEnd: boolean;
      }>
    ) => {
      if (action.payload.isEnd) {
        state.tempPost.refDataArray.push(action.payload.newLinkEditableBlock);
      } else {
        state.tempPost.refDataArray.splice(
          action.payload.currentIndex + 1,
          0,
          action.payload.newLinkEditableBlock
        );
      }
    },
  },
});

export const {
  setTempPostData,
  setTempRefTitleData,
  setTempRefUrlData,
  addTempLinkBlock,
} = tempPostSlice.actions;
export const tempPostReducer = tempPostSlice.reducer;
