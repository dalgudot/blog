import { doc, Firestore, setDoc, WithFieldValue } from 'firebase/firestore';
import { getDB } from './config';

type TarticleDataType = {};

export interface IFireStoreDB {
  db: Firestore;
  setDocument: (
    data: WithFieldValue<TarticleDataType>,
    path: string,
    ...pathSegments: string[]
  ) => Promise<void>;
}

export class FireStoreDB implements IFireStoreDB {
  db: Firestore;

  constructor() {
    this.db = getDB();
  }

  // firestore 규칙
  // https://firebase.google.com/docs/firestore/security/get-started
  // https://firebase.google.com/docs/firestore/security/rules-structure
  async setDocument(
    data: WithFieldValue<TarticleDataType> | undefined,
    path: string,
    ...pathSegments: string[]
  ) {
    await setDoc(doc(this.db, path, ...pathSegments), data);
  }
}
