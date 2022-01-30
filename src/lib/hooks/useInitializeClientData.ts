import { postInitialData } from './../../redux-toolkit/model/post-data-model';
import { setPostData } from '../../redux-toolkit/slices/post-slice';
import { setTempPostData } from '../../redux-toolkit/slices/temp-post-slice';
import { useAppDispatch } from '../../redux-toolkit/store';

export const useInitializeClientData = () => {
  const dispatch = useAppDispatch();

  const initializeClientData = () => {
    dispatch(setPostData(postInitialData));
    dispatch(setTempPostData(postInitialData));
  };

  return initializeClientData;
};
