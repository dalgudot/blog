import { ITextData, TextDataModel } from '../model/text-data-model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPostData, postInitialData } from '../model/post-data-model';
import { ILinkData, LinkDataModel } from '../model/link-data-model';

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

    setCurrentBlockTempImageDownloadURL: (
      state,
      action: PayloadAction<{ imageDownloadURL: string; currentIndex: number }>
    ) => {
      state.tempPost.wysiwygDataArray[action.payload.currentIndex].url =
        action.payload.imageDownloadURL;
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

    setNormalWysiwygCurrentLinkBlockTempLinkUrl: (
      state,
      action: PayloadAction<{ data: string; currentIndex: number }>
    ) => {
      state.tempPost.wysiwygDataArray[action.payload.currentIndex].url =
        action.payload.data;
    },

    // 기본 wysiwyg의 초기값은 p 블럭
    addTempNewBlock: (
      state,
      action: PayloadAction<{
        currentIndex: number;
        isEnd: boolean;
      }>
    ) => {
      const newTextBlock: ITextData = new TextDataModel().createNewTextData();
      if (action.payload.isEnd) {
        state.tempPost.wysiwygDataArray.push(newTextBlock);
      } else {
        state.tempPost.wysiwygDataArray.splice(
          action.payload.currentIndex + 1,
          0,
          newTextBlock
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
        currentIndex: number;
        isEnd: boolean;
      }>
    ) => {
      const newLinkBlock: ILinkData = new LinkDataModel().createNewLinkData();
      if (action.payload.isEnd) {
        state.tempPost.linkWysiwygDataArray.push(newLinkBlock);
      } else {
        state.tempPost.linkWysiwygDataArray.splice(
          action.payload.currentIndex + 1,
          0,
          newLinkBlock
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
  setCurrentBlockTempImageDownloadURL,
  setTempPostCategory,
  setTempArticleTitleData,
  setTempArticleDateTimeData,
  setTempBlockTypeData,
  setNormalWysiwygCurrentLinkBlockTempLinkUrl,
  addTempNewBlock,
  removeTempCurrentBlock,
  addTempNewLinkBlock,
  removeTempLinkBlock,
  setCurrentLinkBlockTempHtml,
  setCurrentLinkBlockTempLinkUrl,
} = tempPostSlice.actions;
export const tempPostReducer = tempPostSlice.reducer;
