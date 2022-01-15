import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  Auth,
  UserCredential,
  User,
} from 'firebase/auth';
import { Dispatch, SetStateAction } from 'react';
import { firebaseConfig } from './firebase';

export interface IAuthService {
  logIn: (providerName: TproviderName) => Promise<UserCredential>;
  logOut: () => Promise<void>;
}

type TproviderName = 'Google' | 'Github';

export class AuthService implements IAuthService {
  private auth: Auth;
  private googleAuthProvider: GoogleAuthProvider;
  private githubAuthProvider: GithubAuthProvider;

  constructor() {
    initializeApp(firebaseConfig);
    this.auth = getAuth();
    this.googleAuthProvider = new GoogleAuthProvider();
    this.githubAuthProvider = new GithubAuthProvider();
  }

  logIn(providerName: TproviderName) {
    const authProvider = this.getProvider(providerName);
    return signInWithPopup(this.auth, authProvider);
  }

  logOut() {
    return this.auth.signOut();
  }

  onAuthChange(
    setUser: Dispatch<SetStateAction<User | undefined>>,
    showToast: (message: string) => void
  ) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        showToast('로그인 유지');
      } else {
        // User is signed out
        // ...
      }
    });
  }

  private getProvider(providerName: TproviderName) {
    switch (providerName) {
      case 'Google':
        return this.googleAuthProvider;
      case 'Github':
        return this.githubAuthProvider;
      default:
        throw new Error(`not supported provider: ${providerName}`);
    }
  }
}
