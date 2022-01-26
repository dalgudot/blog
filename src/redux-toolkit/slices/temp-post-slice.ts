import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRefData, RefDataModel, IRefDataModel } from '../model/ref-data-model';

const refData: IRefDataModel = new RefDataModel();

// const initialState: IPostData = {
const initialState = {
  tempPost: {
    tempDateTime: '',
    tempTitle: '',
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

    setTempArticleTitleData: (
      state,
      action: PayloadAction<{ inputPureHtml: string }>
    ) => {
      state.tempPost.tempTitle = action.payload.inputPureHtml;
    },

    setTempRefTitleData: (
      state,
      action: PayloadAction<{ inputPureHtml: string; currentIndex: number }>
    ) => {
      state.tempPost.refDataArray[action.payload.currentIndex].title =
        action.payload.inputPureHtml;
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

    removeTempLinkBlock: (
      state,
      action: PayloadAction<{ currentIndex: number }>
    ) => {
      state.tempPost.refDataArray.splice(action.payload.currentIndex, 1);
    },
  },
});

export const {
  setTempPostData,
  setTempArticleTitleData,
  setTempRefTitleData,
  setTempRefUrlData,
  addTempLinkBlock,
  removeTempLinkBlock,
} = tempPostSlice.actions;
export const tempPostReducer = tempPostSlice.reducer;
