import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { setUid } from '../../redux-toolkit/slices/userSlice';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../redux-toolkit/store';
import {
  Authentication,
  IAuthentication,
} from '../../service/firebase/authentication';
import { Tuser } from '../../types/firebase';

const Admin: NextPage = () => {
  const router = useRouter();
  const { uid } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const auth: IAuthentication = new Authentication();

  useEffect(() => {
    const onUserChanged = (user: Tuser) => {
      dispatch(setUid(user?.uid));
    };
    auth.onAuthChange(onUserChanged); // 한 세션(탭)에서 새로고침 시 로그인 유지

    if (uid === process.env.NEXT_PUBLIC_ADMIN_UID) {
      router.push('/', '/admin');
    }
  }, [uid]);

  return (
    <>
      <h1>Admin</h1>
    </>
  );
};

export default Admin;
