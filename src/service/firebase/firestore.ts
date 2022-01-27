import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  QuerySnapshot,
  setDoc,
  updateDoc,
  WithFieldValue,
} from 'firebase/firestore';
import { getDB } from './config';
import { IRefData } from '../../redux-toolkit/model/ref-data-model';

const db = getDB();
const devCollectionRefName = 'dev';
const designCollectionRefName = 'design';
const draftCollectionRefName = 'draft';

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
    // dateTime: string,
    title: string;
    refDataArray: IRefData[];
  }[] = [];

  querySnapshot.forEach((doc) => {
    dataArray.push({
      category: collectionRefName,
      order: doc.id,
      // dateTime: string,
      title: doc.data().title,
      refDataArray: doc.data().refDataArray,
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

export const getPostByCategoryOrder = async (
  params: {
    category: string;
    order: string;
  },
  locale: 'ko' | 'en'
) => {
  const ref = locale === 'ko' ? params.order : `${params.order}-en`;
  const docRef = doc(db, params.category, ref);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const post = docSnap.data();
    return post;
  } else {
    throw new Error('No such document!');
  }
};

export const getDraftList = async () => {
  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
    collection(db, draftCollectionRefName)
  );

  const dataArray: {
    order: string;
    dateTime: string;
    title: string;
  }[] = [];

  querySnapshot.forEach((doc) => {
    dataArray.push({
      order: doc.id,
      dateTime: doc.data().dateTime,
      title: doc.data().title,
    });
  });

  return dataArray;
};

export const getDraftByOrder = async (order: string) => {
  const docRef = doc(db, draftCollectionRefName, order);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const draft = docSnap.data();
    return draft;
  } else {
    throw new Error('No such draft!');
  }
};

///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////

export const saveDataToFireStoreDB = async (
  data: WithFieldValue<IPostData> | undefined,
  path: string
  // ...pathSegments: string[]
) => {
  await setDoc(doc(db, path), data);
};

export const changeToPublish = async (path: string) => {
  await updateDoc(doc(db, path), {
    publish: true,
  });
};
