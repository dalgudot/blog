import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  QuerySnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
  WithFieldValue,
  query,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';
import { IPostData } from '../../redux-toolkit/model/post-data-model';
import { db } from './config';

export const devCollectionRefName = 'dev';
export const designCollectionRefName = 'design';
export const brandCollectionRefName = 'brand';
export const storyCollectionRefName = 'story';
export const draftCollectionRefName = 'draft';

export const getEachAllCollectionDataArray = async (
  collectionRefName: string
) => {
  // 최신순 정렬 위해 query 이용
  const q = query(
    collection(db, collectionRefName),
    orderBy('dateTime', 'desc')
  );
  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
  const dataArray: IPostData[] = [];

  querySnapshot.forEach((doc) => {
    dataArray.push({
      category: collectionRefName,
      order: doc.id,
      series: doc.data().series,
      dateTime: doc.data().dateTime,
      title: doc.data().title,
      tagDataArray: doc.data().tagDataArray,
      wysiwygDataArray: doc.data().wysiwygDataArray,
      linkWysiwygDataArray: doc.data().linkWysiwygDataArray,
      status: doc.data().status,
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

  const brandDataArray = await getEachAllCollectionDataArray(
    brandCollectionRefName
  );

  const storyDataArray = await getEachAllCollectionDataArray(
    storyCollectionRefName
  );

  const allCollectionDataArray = [
    ...devDataArray,
    ...designDataArray,
    ...brandDataArray,
    ...storyDataArray,
  ];

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
  dbCollection: string,
  dbDocument: string,
  data: WithFieldValue<IPostData>
  // | undefined
) => {
  // setDoc() - 새로 만들거나 덮어쓸 때 쓰는 API
  await setDoc(doc(db, dbCollection, dbDocument), data, {
    merge: true,
  });
};

export const changeToPublished = async (
  dbCollection: string,
  dbDocument: string
) => {
  // updateDoc() - 문서의 일부만 업데이트하는 API
  const docRef = doc(db, dbCollection, dbDocument);
  await updateDoc(docRef, {
    status: 'published',
  });
};

// Update the timestamp field with the value from the server
export const updateTimestamp = async (
  dbCollection: string,
  dbDocument: string
) => {
  const docRef = doc(db, dbCollection, dbDocument);
  await updateDoc(docRef, {
    serverTimestamp: serverTimestamp(),
  });
};

export const deleteDataToFireStoreDB = async (
  dbCollection: string,
  dbDocument: string
) => {
  // deleteDoc() - 문서 삭제 API
  await deleteDoc(doc(db, dbCollection, dbDocument));
};
