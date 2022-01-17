import {
  collection,
  doc,
  getDoc,
  setDoc,
  WithFieldValue,
  orderBy,
  query,
  limit,
  where,
  getDocs,
} from 'firebase/firestore';
import { objectToArray } from '../../lib/utils/data';

import { getDB } from './config';

type TarticleDataType = {};

const db = getDB();
const devCollectionRef = collection(db, 'dev');
const devDocWritingRef = doc(db, 'dev', 'writing');
const devDocPublishRef = doc(db, 'dev', 'publish');

export const setDocument = async (
  data: WithFieldValue<TarticleDataType> | undefined,
  path: string,
  ...pathSegments: string[]
) => {
  await setDoc(doc(db, path, ...pathSegments), data);
};

export const getAllArticles = async () => {
  const docSnap = await getDoc(devDocPublishRef);
  const dataArray = objectToArray(docSnap.data() as object);
  console.log('get');
  return dataArray;
};
