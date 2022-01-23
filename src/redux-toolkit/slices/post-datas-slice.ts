import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPostDatas {
  postDatas: {
    articleDatas: IArticleData[];
    refDatas: IRefData[];
  };
}

export interface IArticleData {}

export interface IRefData {
  title: string;
  url: string;
}

const initialState = {
  postDatas: {
    articleDatas: {},

    refDatas: [
      {
        title: '',
        url: '',
      },
    ],
  },
};

export const postDataSlice = createSlice({
  name: 'postDatas',
  initialState,
  reducers: {
    setRefDatas: (state, action: PayloadAction<IRefData[]>) => {
      state.postDatas.refDatas = action.payload;
    },

    setRefTitleData: (
      state,
      action: PayloadAction<{ data: string; currentIndex: number }>
    ) => {
      state.postDatas.refDatas[action.payload.currentIndex].title =
        action.payload.data;
    },
    setRefUrlData: (
      state,
      action: PayloadAction<{ data: string; currentIndex: number }>
    ) => {
      state.postDatas.refDatas[action.payload.currentIndex].url =
        action.payload.data;
    },
  },
});

export const { setRefDatas, setRefTitleData, setRefUrlData } =
  postDataSlice.actions;
export const postDataReducer = postDataSlice.reducer;
