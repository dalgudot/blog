import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { postReducer } from './slices/post-slice';
import { tempPostReducer } from './slices/temp-post-slice';
import { userAuthReducer } from './slices/user-slice';

const store = configureStore({
  reducer: {
    user: userAuthReducer,
    post: postReducer,
    tempPost: tempPostReducer,
  },
});

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
