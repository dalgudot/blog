import { useToast } from '@dalgu/react-toast';
import { User } from 'firebase/auth';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import TextEditor from '../../components/text-editor/text-editor';
import { AuthService } from '../../service/auth_service';
import { authState } from '../../service/firebase';

const Admin: NextPage = () => {
  const authService = new AuthService();
  const [user, setUser] = useState<User>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { showToast } = useToast();

  useEffect(() => {
    authService //
      .onAuthChange(setUser, showToast); // 같은 탭 안에서 새로고침해도 로그인 유지(세션)

    if (user?.uid === process.env.NEXT_PUBLIC_ADMIN_UID) {
      setIsAdmin(true);
    } else if (user === undefined) {
      setIsAdmin(false);
    }
  }, [user]);

  // console.log('user', user);
  // console.log('isAdmin', isAdmin);

  const onLogIn = () => {
    authService //
      .logIn('Google')
      .then((data) => {
        const user = data.user;
        setUser(user);
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
        <button onClick={onLogIn}>구글로 로그인</button>
      </>
    );
  }
};

export default Admin;

// https://medium.com/swlh/how-to-build-a-text-editor-like-notion-c510aedfdfcc#:~:text=From%20a%20technical,or%20textarea%20element.

// From a technical perspective, a block is a so-called contenteditable element. Nearly every HTML element can be turned into an editable one. You just have to add the contenteditable="true" attribute to it.
// This indicates if the element should be editable by the user. If so, users can edit their content directly in the HTML document as if it would be an input or textarea element.
