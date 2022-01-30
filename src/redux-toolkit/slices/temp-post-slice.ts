import { ITextData } from '../model/text-data-model';
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

    // 기본 wysiwyg의 초기값은 p 블럭
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

    addTempNewLinkBlock: (
      state,
      action: PayloadAction<{
        newBlock: ILinkData;
        currentIndex: number;
        isEnd: boolean;
      }>
    ) => {
      if (action.payload.isEnd) {
        state.tempPost.linkWysiwygDataArray.push(action.payload.newBlock);
      } else {
        state.tempPost.linkWysiwygDataArray.splice(
          action.payload.currentIndex + 1,
          0,
          action.payload.newBlock
        );
      }
    },

    removeTempLinkBlock: (
      state,
      action: PayloadAction<{ currentIndex: number }>
    ) => {
      state.tempPost.linkWysiwygDataArray.splice(
        action.payload.currentIndex,
        1
      );
    },

    setCurrentLinkBlockTempHtml: (
      state,
      action: PayloadAction<{ inputHtml: string; currentIndex: number }>
    ) => {
      state.tempPost.linkWysiwygDataArray[action.payload.currentIndex].html =
        action.payload.inputHtml;
    },

    setCurrentLinkBlockTempLinkUrl: (
      state,
      action: PayloadAction<{ data: string; currentIndex: number }>
    ) => {
      state.tempPost.linkWysiwygDataArray[action.payload.currentIndex].url =
        action.payload.data;
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
  addTempNewBlock,
  removeTempCurrentBlock,
  addTempNewLinkBlock,
  removeTempLinkBlock,
  setCurrentLinkBlockTempHtml,
  setCurrentLinkBlockTempLinkUrl,
} = tempPostSlice.actions;
export const tempPostReducer = tempPostSlice.reducer;
