import { IPostData } from './../../service/firebase/firestore';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRefData } from '../../service/firebase/firestore';

// const initialState: IPostData = {
const initialState = {
  post: {
    refDataArray: [
      {
        title: '',
        url: '',
      },
    ],
  },
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostData: (state, action: PayloadAction<any>) => {
      state.post = action.payload;
    },

    setRefTitleData: (
      state,
      action: PayloadAction<{ data: string; currentIndex: number }>
    ) => {
      state.post.refDataArray[action.payload.currentIndex].title =
        action.payload.data;
    },

    setRefUrlData: (
      state,
      action: PayloadAction<{ data: string; currentIndex: number }>
    ) => {
      state.post.refDataArray[action.payload.currentIndex].url =
        action.payload.data;
    },
  },
});

export const { setPostData, setRefTitleData, setRefUrlData } =
  postSlice.actions;
export const postReducer = postSlice.reducer;
