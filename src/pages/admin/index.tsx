import { useToast } from '@dalgu/react-toast';
import { User } from 'firebase/auth';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import TextEditor from '../../components/text-editor/text-editor';
import {
  authState,
  signInWithGoogle,
  signOutWithGoogle,
} from '../../service/firebase';

const Admin: NextPage = () => {
  const [user, setUser] = useState<User>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { showToast } = useToast();

  useEffect(() => {
    authState(setUser, showToast);

    if (user?.uid === process.env.NEXT_PUBLIC_ADMIN_UID) {
      setIsAdmin(true);
    } else if (user === undefined) {
      setIsAdmin(false);
    }
  }, [user]);

  // console.log('user', user);
  // console.log('isAdmin', isAdmin);

  if (isAdmin) {
    return (
      <>
        <TextEditor />
        <button onClick={() => signOutWithGoogle(setUser, showToast)}>
          로그아웃
        </button>
      </>
    );
  } else {
    return (
      <>
        <button onClick={() => signInWithGoogle(setUser, showToast)}>
          구글로 로그인
        </button>
        <button onClick={() => signOutWithGoogle(setUser, showToast)}>
          로그아웃
        </button>
      </>
    );
  }
};

export default Admin;

// https://medium.com/swlh/how-to-build-a-text-editor-like-notion-c510aedfdfcc#:~:text=From%20a%20technical,or%20textarea%20element.

// From a technical perspective, a block is a so-called contenteditable element. Nearly every HTML element can be turned into an editable one. You just have to add the contenteditable="true" attribute to it.
// This indicates if the element should be editable by the user. If so, users can edit their content directly in the HTML document as if it would be an input or textarea element.
