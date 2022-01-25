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

    // setRefTitleData: (
    //   state,
    //   action: PayloadAction<{ data: string; currentIndex: number }>
    // ) => {
    //   state.post.refDataArray[action.payload.currentIndex].title =
    //     action.payload.data;
    // },

    // setRefUrlData: (
    //   state,
    //   action: PayloadAction<{ data: string; currentIndex: number }>
    // ) => {
    //   state.post.refDataArray[action.payload.currentIndex].url =
    //     action.payload.data;
    // },

    addLinkBlock: (state, action: PayloadAction<IRefData>) => {
      state.post.refDataArray.push(action.payload);
    },
  },
});

export const {
  setPostData,
  // setRefTitleData, setRefUrlData,
  addLinkBlock,
} = postSlice.actions;
export const postReducer = postSlice.reducer;
