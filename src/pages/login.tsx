import { useToast } from '@dalgu/react-toast';
import type { NextPage } from 'next';
import { useIsAdmin } from '../lib/hooks/useIsAdmin';
import { setUid } from '../redux-toolkit/slices/user-slice';
import { useAppDispatch } from '../redux-toolkit/store';
import {
  Authentication,
  IAuthentication,
  TproviderName,
} from '../service/firebase/authentication';

const Login: NextPage = () => {
  const { isAdmin } = useIsAdmin();
  const auth: IAuthentication = new Authentication();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const onLogIn = (providerName: TproviderName) => {
    auth //
      .logIn(providerName)
      .then((data) => {
        dispatch(setUid(data.user.uid));
        if (data.user.uid !== process.env.NEXT_PUBLIC_ADMIN_UID) {
          onLogOut();
          showToast('관리자가 아니므로 자동으로 로그아웃되었습니다.');
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const onLogOut = () => {
    auth //
      .logOut()
      .then(() => {
        setUid(null);
        dispatch(setUid(null));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  if (isAdmin) {
    return <button onClick={onLogOut}>로그아웃</button>;
  } else {
    return <button onClick={() => onLogIn('Google')}>구글로 로그인</button>;
  }
};

export default Login;
