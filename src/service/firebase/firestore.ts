import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  QuerySnapshot,
  setDoc,
  WithFieldValue,
} from 'firebase/firestore';
import { objectToArray } from '../../lib/utils/data';
import { getDB } from './config';
import { IRefData } from '../../redux-toolkit/model/ref-data';

const db = getDB();
const devCollectionRefName = 'dev';
const designCollectionRefName = 'design';

export interface IPostData {
  // articleDataObj: Object
  refDataArray: IRefData[];
}

const getEachAllCollectionDataArray = async (collectionRefName: string) => {
  // 컬렉션 전체 데이터 받아오는 'getDoc's''
  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
    collection(db, collectionRefName)
  );

  const dataArray: {
    category: string;
    order: string;
    refDataArray: IRefData[];
  }[] = [];

  querySnapshot.forEach((doc) => {
    dataArray.push({
      category: collectionRefName,
      order: doc.id,
      refDataArray: doc.data() as IRefData[],
    });
  });

  return dataArray;
};

export const getAllCollectionDataArray = async () => {
  const devDataArray = await getEachAllCollectionDataArray(
    devCollectionRefName
  );

  const designDataArray = await getEachAllCollectionDataArray(
    designCollectionRefName
  );

  const allCollectionDataArray = devDataArray.concat(designDataArray);
  return allCollectionDataArray;
};

export const getPostByCategoryOrder = async (params: {
  category: string;
  order: string;
}) => {
  const docRef = doc(db, params.category, params.order);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const post = docSnap.data();
    return post;
  } else {
    throw new Error('No such document!');
  }
};

///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
// const devCollectionRef = collection(db, 'dev');
// const devDocWritingRef = doc(db, 'dev', 'writing');
const devDocPublishRef = doc(db, 'dev', 'publish');

export const setDocument = async (
  data: WithFieldValue<IPostData> | undefined,
  path: string,
  ...pathSegments: string[]
) => {
  await setDoc(doc(db, path, ...pathSegments), data);
};

export const getAllArticles = async () => {
  const docSnap = await getDoc(devDocPublishRef);
  const dataArray = objectToArray(docSnap.data() as object);

  return dataArray;
};
