import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import TextEditor from '../../components/text-editor/text-editor';
import {
  Authentication,
  IAuthentication,
  TproviderName,
} from '../../service/firebase/authentication';
import { initializeFirebaseApp } from '../../service/firebase/config';
import { Tuser } from '../../type/firebase';

const Admin: NextPage = () => {
  initializeFirebaseApp();
  const auth: IAuthentication = new Authentication();
  const [user, setUser] = useState<Tuser>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const onUserChanged = (user: Tuser) => {
      setUser(user);
    };
    auth.onAuthChange(onUserChanged); // 한 세션(탭)에서 새로고침 시 로그인 유지

    user?.uid === process.env.NEXT_PUBLIC_ADMIN_UID
      ? setIsAdmin(true)
      : setIsAdmin(false);
  }, [user]);

  const onLogIn = (providerName: TproviderName) => {
    auth //
      .logIn(providerName)
      .then((data) => {
        setUser(data.user);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const onLogOut = () => {
    auth //
      .logOut()
      .then(() => {
        setUser(undefined);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  if (isAdmin) {
    return (
      <>
        <TextEditor user={user} />
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

export default Admin;

// https://medium.com/swlh/how-to-build-a-text-editor-like-notion-c510aedfdfcc#:~:text=From%20a%20technical,or%20textarea%20element.

// From a technical perspective, a block is a so-called contenteditable element. Nearly every HTML element can be turned into an editable one. You just have to add the contenteditable="true" attribute to it.
// This indicates if the element should be editable by the user. If so, users can edit their content directly in the HTML document as if it would be an input or textarea element.
