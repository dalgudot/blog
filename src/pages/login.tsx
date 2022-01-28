import type { NextPage } from 'next';
import { setUid } from '../redux-toolkit/slices/user-slice';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../redux-toolkit/store';
import {
  Authentication,
  IAuthentication,
  TproviderName,
} from '../service/firebase/authentication';

const Login: NextPage = () => {
  const auth: IAuthentication = new Authentication();
  const { user, uid } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const onLogIn = (providerName: TproviderName) => {
    auth //
      .logIn(providerName)
      .then((data) => {
        dispatch(setUid(data.user.uid));
        if (data.user.uid === process.env.NEXT_PUBLIC_ADMIN_UID) {
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

  if (user) {
    return <button onClick={onLogOut}>로그아웃</button>;
  } else {
    return <button onClick={() => onLogIn('Google')}>구글로 로그인</button>;
  }
};

export default Login;
