import type { NextPage } from 'next';
import { useToast } from '@dalgu/react-toast';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import TextEditor from '../../components/text-editor/text-editor';
import {
  AuthService,
  TproviderName,
} from '../../service/firebase/auth_service';

const Admin: NextPage = () => {
  const authService = new AuthService();
  const [user, setUser] = useState<User>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { showToast } = useToast();

  useEffect(() => {
    const onUserChanged = (user: User) => {
      setUser(user);
      // showToast('로그인 유지');
    };
    authService.onAuthChange(onUserChanged); // 한 세션(탭)에서 새로고침 시 로그인 유지

    user?.uid === process.env.NEXT_PUBLIC_ADMIN_UID
      ? setIsAdmin(true)
      : setIsAdmin(false);
  }, [user]);

  const onLogIn = (providerName: TproviderName) => {
    authService //
      .logIn(providerName)
      .then((data) => {
        setUser(data.user);
        showToast('로그인');
      });
  };

  const onLogOut = () => {
    authService //
      .logOut()
      .then(() => {
        setUser(undefined);
        showToast('로그아웃');
      });
  };

  if (isAdmin) {
    return (
      <>
        <TextEditor />
        <button onClick={onLogOut}>로그아웃</button>
      </>
    );
  } else {
    return (
      <>
        <button onClick={() => onLogIn('Google')}>구글로 로그인</button>
        {/* <button onClick={() => onLogIn('Github')}>깃헙으로 로그인</button> */}
      </>
    );
  }
};

export default Admin;

// https://medium.com/swlh/how-to-build-a-text-editor-like-notion-c510aedfdfcc#:~:text=From%20a%20technical,or%20textarea%20element.

// From a technical perspective, a block is a so-called contenteditable element. Nearly every HTML element can be turned into an editable one. You just have to add the contenteditable="true" attribute to it.
// This indicates if the element should be editable by the user. If so, users can edit their content directly in the HTML document as if it would be an input or textarea element.
