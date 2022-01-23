import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import List from '../components/navigation/article/nav-lists';
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
import { Tuser } from '../types/firebase';

const Login: NextPage = () => {
  const router = useRouter();
  const auth: IAuthentication = new Authentication();
  // const [user, setUser] = useState<Tuser>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const { uid } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const onUserChanged = (user: Tuser) => {
  //     dispatch(setUid(user?.uid));
  //   };
  //   auth.onAuthChange(onUserChanged); // 한 세션(탭)에서 새로고침 시 로그인 유지

  //   uid === process.env.NEXT_PUBLIC_ADMIN_UID
  //     ? setIsAdmin(true)
  //     : setIsAdmin(false);
  // }, [uid]);

  useEffect(() => {}, []);

  const onLogIn = (providerName: TproviderName) => {
    auth //
      .logIn(providerName)
      .then((data) => {
        dispatch(setUid(data.user.uid));
        if (uid === process.env.NEXT_PUBLIC_ADMIN_UID) {
          router.push('/', '/admin');
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
        setUid(undefined);
        dispatch(setUid(undefined));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  if (isAdmin) {
    return (
      <>
        <button onClick={onLogOut}>로그아웃</button>
      </>
    );
  } else {
    return (
      <>
        <button onClick={() => onLogIn('Google')}>구글로 로그인</button>
      </>
    );
  }
};

export default Login;

// https://medium.com/swlh/how-to-build-a-text-editor-like-notion-c510aedfdfcc#:~:text=From%20a%20technical,or%20textarea%20element.

// From a technical perspective, a block is a so-called contenteditable element. Nearly every HTML element can be turned into an editable one. You just have to add the contenteditable="true" attribute to it.
// This indicates if the element should be editable by the user. If so, users can edit their content directly in the HTML document as if it would be an input or textarea element.
