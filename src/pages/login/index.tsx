import { useToast } from '@dalgu/react-toast';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useIsAdmin } from '../../lib/hooks/useIsAdmin';
import { setUid } from '../../redux-toolkit/slices/user-slice';
import { useAppDispatch } from '../../redux-toolkit/store';
import {
  Authentication,
  IAuthentication,
  TproviderName,
} from '../../service/firebase/authentication';
import s from './login.module.scss';
import { Button } from '@dalgu/core-design-system';

const Login: NextPage = () => {
  const { isAdmin } = useIsAdmin();
  const auth: IAuthentication = new Authentication();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const router = useRouter();

  const onLogIn = (providerName: TproviderName) => {
    auth //
      .logIn(providerName)
      .then((data) => {
        dispatch(setUid(data.user.uid));
        if (data.user.uid !== process.env.NEXT_PUBLIC_ADMIN_UID) {
          onLogOut();
          showToast('관리자가 아니므로 로그아웃되었습니다.');
        } else {
          router.push('/');
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

  return (
    <main className={s.alignment__center}>
      <Button
        label={isAdmin ? '로그아웃' : '구글로 로그인'}
        onClick={() => {
          isAdmin ? onLogOut() : onLogIn('Google');
        }}
      />
    </main>
  );
};

export default Login;
