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
} from 'firebase/firestore';
import { IPostData } from '../../redux-toolkit/model/post-data-model';
import { db } from './config';

export const devCollectionRefName = 'dev';
export const designCollectionRefName = 'design';
export const draftCollectionRefName = 'draft';

export const getEachAllCollectionDataArray = async (
  collectionRefName: string
) => {
  // 컬렉션 전체 데이터 받아오는 'getDoc's''
  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
    collection(db, collectionRefName)
  );

  const dataArray: IPostData[] = [];

  querySnapshot.forEach((doc) => {
    dataArray.push({
      // postId: doc.data().postId,
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
