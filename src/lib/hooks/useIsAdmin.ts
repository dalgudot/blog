import { RootState } from './../../redux-toolkit/store';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux-toolkit/store';
import { setUid } from '../../redux-toolkit/slices/user-slice';
import {
  Authentication,
  IAuthentication,
} from '../../service/firebase/authentication';
import { User } from 'firebase/auth';

export const useIsAdmin = () => {
  const auth: IAuthentication = new Authentication();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { uid } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  // https://firebase.google.com/docs/auth/web/manage-users?hl=ko
  useEffect(() => {
    const onUserChanged = (user: User) => {
      dispatch(setUid(user?.uid));
    };
    auth.onAuthChange(onUserChanged); // 한 세션(탭)에서 새로고침 시 로그인 유지

    uid === process.env.NEXT_PUBLIC_ADMIN_UID
      ? setIsAdmin(true)
      : setIsAdmin(false);
  }, [uid]);

  return { isAdmin };
};
