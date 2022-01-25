import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRefData, RefData } from '../model/ref-data';

const refData = new RefData();

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

    addTempLinkBlock: (state, action: PayloadAction<IRefData>) => {
      state.tempPost.refDataArray.push(action.payload);
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
