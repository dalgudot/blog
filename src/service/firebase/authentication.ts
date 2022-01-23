import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  Auth,
  UserCredential,
  User,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';

export type TproviderName = 'Google';

export interface IAuthentication {
  logIn: (providerName: TproviderName) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  onAuthChange: (onUserChanged: (user: User) => void) => void;
}

export class Authentication implements IAuthentication {
  private auth: Auth;
  private googleAuthProvider: GoogleAuthProvider;

  constructor() {
    this.auth = getAuth();
    this.googleAuthProvider = new GoogleAuthProvider();
  }

  logIn(providerName: TproviderName) {
    const authProvider = this.getProvider(providerName);
    return signInWithPopup(this.auth, authProvider);
  }

  logOut() {
    return this.auth.signOut();
  }

  // setPersistenceSession() {
  //   setPersistence(this.auth, browserSessionPersistence).then(() => {
  //     return signInWithPopup(this.auth, this.googleAuthProvide);
  //   });
  // }

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
      // case 'Github':
      //   return this.githubAuthProvider;
      default:
        throw new Error(`not supported provider: ${providerName}`);
    }
  }
}
