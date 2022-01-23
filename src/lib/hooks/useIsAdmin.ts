import { RootState } from './../../redux-toolkit/store';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux-toolkit/store';
import { setUid } from '../../redux-toolkit/slices/userSlice';
import {
  Authentication,
  IAuthentication,
} from '../../service/firebase/authentication';
import { Tuser } from '../../types/firebase';

export const useIsAdmin = () => {
  const auth: IAuthentication = new Authentication();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { uid } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const onUserChanged = (user: Tuser) => {
      dispatch(setUid(user?.uid));
    };
    auth.onAuthChange(onUserChanged); // 한 세션(탭)에서 새로고침 시 로그인 유지

    uid === process.env.NEXT_PUBLIC_ADMIN_UID
      ? setIsAdmin(true)
      : setIsAdmin(false);
  }, [uid]);

  return { isAdmin };
};
