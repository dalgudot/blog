import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  Auth,
  UserCredential,
  User,
} from 'firebase/auth';

export type TproviderName = 'Google' | 'Github' | 'Apple';

export interface IAuthentication {
  logIn: (providerName: TproviderName) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  onAuthChange: (onUserChanged: (user: User) => void) => void;
}

export class Authentication implements IAuthentication {
  private auth: Auth;
  private googleAuthProvider: GoogleAuthProvider;
  private githubAuthProvider: GithubAuthProvider;

  constructor() {
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
