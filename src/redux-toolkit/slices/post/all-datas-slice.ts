import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPostDatas {
  postAllDatas: {
    articleDatas: IArticleData[];
    refDatas: IRefData[];
  };
}

export interface IArticleData {}

export interface IRefData {
  title: string;
  url: string;
}
[];

const initialState: IPostDatas = {
  postAllDatas: {
    articleDatas: [{}],

    refDatas: [
      {
        title: '',
        url: '',
      },
    ],
  },
};

export const postAllDataSlice = createSlice({
  name: 'postDatas',
  initialState,
  reducers: {
    setPostAllDatas: (state, action: PayloadAction<IRefData[]>) => {
      state.postAllDatas.refDatas = action.payload;
    },

    setRefDatas: (state, action: PayloadAction<IRefData[]>) => {
      state.postAllDatas.refDatas = action.payload;
    },
    setRefTitleData: (
      state,
      action: PayloadAction<{ data: string; currentIndex: number }>
    ) => {
      state.postAllDatas.refDatas[action.payload.currentIndex].title =
        action.payload.data;
    },
    setRefUrlData: (
      state,
      action: PayloadAction<{ data: string; currentIndex: number }>
    ) => {
      state.postAllDatas.refDatas[action.payload.currentIndex].url =
        action.payload.data;
    },

    // setRefTitleData: (
    //   state,
    //   action: PayloadAction<{ data: string; currentIndex: number }>
    // ) => {
    //   state.postDatas.refDatas[action.payload.currentIndex].title =
    //     action.payload.data;
    // },
    // setRefUrlData: (
    //   state,
    //   action: PayloadAction<{ data: string; currentIndex: number }>
    // ) => {
    //   state.postDatas.refDatas[action.payload.currentIndex].url =
    //     action.payload.data;
    // },
  },
});

export const {
  setPostAllDatas,
  setRefDatas,
  setRefTitleData,
  setRefUrlData,
  // setRefTitleData, setRefUrlData
} = postAllDataSlice.actions;
export const postDataReducer = postAllDataSlice.reducer;
