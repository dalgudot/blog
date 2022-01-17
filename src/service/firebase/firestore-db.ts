import {
  doc,
  Firestore,
  getDoc,
  setDoc,
  WithFieldValue,
} from 'firebase/firestore';
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

  async getAllPosts() {
    const docSnap = await getDoc(doc(this.db, 'posts/dev'));
    const dataArray = Object.values(docSnap.data() as any); // Object to Array
    console.log(dataArray);

    return dataArray;
  }
}
