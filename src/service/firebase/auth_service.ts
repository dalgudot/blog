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
import { firebaseConfig } from './config';

export type TproviderName = 'Google' | 'Github';

export interface IAuthService {
  logIn: (providerName: TproviderName) => Promise<UserCredential>;
  logOut: () => Promise<void>;
}

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

  onAuthChange(onUserChanged: (user: User) => void) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        onUserChanged(user);
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
