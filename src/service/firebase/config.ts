import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

export const initializeFirebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage(initializeFirebaseApp);

// 사용자 관리
// https://firebase.google.com/docs/auth/web/manage-users?authuser=0
// 로그인 유지
// https://firebase.google.com/docs/auth/web/auth-state-persistence
// https://firebase.google.com/docs/auth/admin/manage-cookies
// 엘리님 추천: 파이어베이스에서 제공하는 서버 사이드 세션 쿠키 관리
