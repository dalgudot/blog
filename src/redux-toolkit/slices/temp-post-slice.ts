import { ITextData, TBlockType } from '../model/text-data-model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPostData, postInitialData } from '../model/post-data-model';
import { ILinkData } from '../model/link-data-model';

const initialState: { tempPost: IPostData } = {
  tempPost: postInitialData,
};

export const tempPostSlice = createSlice({
  name: 'tempPost',
  initialState,
  reducers: {
    setTempPostData: (state, action: PayloadAction<IPostData>) => {
      state.tempPost = action.payload;
    },

    setCurrentBlockTempHtml: (
      state,
      action: PayloadAction<{ inputHtml: string; currentIndex: number }>
    ) => {
      state.tempPost.wysiwygDataArray[action.payload.currentIndex].html =
        action.payload.inputHtml;
    },

    setTempPostCategory: (state, action: PayloadAction<string>) => {
      state.tempPost.category = action.payload;
    },

    setTempArticleTitleData: (
      state,
      action: PayloadAction<{ inputHtml: string }>
    ) => {
      state.tempPost.title = action.payload.inputHtml;
    },

    setTempArticleDateTimeData: (
      state,
      action: PayloadAction<{ seoDate: string }>
    ) => {
      state.tempPost.dateTime = action.payload.seoDate;
    },

    setTempBlockTypeData: (
      state,
      action: PayloadAction<{ newBlockType: any; currentIndex: number }>
    ) => {
      state.tempPost.wysiwygDataArray[action.payload.currentIndex].blockType =
        action.payload.newBlockType;
    },

    setTempLinkTitleData: (
      state,
      action: PayloadAction<{ inputHtml: string; currentIndex: number }>
    ) => {
      state.tempPost.linkWysiwygDataArray[action.payload.currentIndex].html =
        action.payload.inputHtml;
    },

    setTempLinkUrlData: (
      state,
      action: PayloadAction<{ data: string; currentIndex: number }>
    ) => {
      state.tempPost.linkWysiwygDataArray[action.payload.currentIndex].url =
        action.payload.data;
    },

    addTempNewBlock: (
      state,
      action: PayloadAction<{
        newBlock: ITextData;
        currentIndex: number;
        isEnd: boolean;
      }>
    ) => {
      if (action.payload.isEnd) {
        state.tempPost.wysiwygDataArray.push(action.payload.newBlock);
      } else {
        state.tempPost.wysiwygDataArray.splice(
          action.payload.currentIndex + 1,
          0,
          action.payload.newBlock
        );
      }
    },

    removeTempCurrentBlock: (
      state,
      action: PayloadAction<{ currentIndex: number }>
    ) => {
      state.tempPost.wysiwygDataArray.splice(action.payload.currentIndex, 1);
    },
  },
});

export const {
  setTempPostData,
  setCurrentBlockTempHtml,
  setTempPostCategory,
  setTempArticleTitleData,
  setTempArticleDateTimeData,
  setTempBlockTypeData,
  setTempLinkTitleData,
  setTempLinkUrlData,
  addTempNewBlock,
  removeTempCurrentBlock,
} = tempPostSlice.actions;
export const tempPostReducer = tempPostSlice.reducer;
