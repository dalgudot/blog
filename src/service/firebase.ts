import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  User,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from 'firebase/auth';
import { Dispatch, SetStateAction } from 'react';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

// 사용자 관리
// https://firebase.google.com/docs/auth/web/manage-users?authuser=0
// 로그인 유지
// https://firebase.google.com/docs/auth/web/auth-state-persistence
// https://firebase.google.com/docs/auth/admin/manage-cookies
// 엘리님 추천: 파이어베이스에서 제공하는 서버 사이드 세션 쿠키 관리

// Initialize Firebase
initializeApp(firebaseConfig);
const googleAuthProvider = new GoogleAuthProvider();
const auth = getAuth();

export const signInWithGoogle = (
  setUser: Dispatch<SetStateAction<User | undefined>>,
  showToast: (message: string) => void
) => {
  signInWithPopup(auth, googleAuthProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      setUser(user);
      showToast('로그인');
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      // return signIn;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const authState = (
  setUser: Dispatch<SetStateAction<User | undefined>>,
  showToast: (message: string) => void
) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      setUser(user);
      showToast('로그인 유지');

      console.log('현재 사용자', auth.currentUser);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
};

export const signOutWithGoogle = (
  setUser: Dispatch<SetStateAction<User | undefined>>,
  showToast: (message: string) => void
) => {
  signOut(auth)
    .then(() => {
      setUser(undefined);
      showToast('로그아웃');
    })
    .catch((error) => {
      // An error happened.
    });
};
