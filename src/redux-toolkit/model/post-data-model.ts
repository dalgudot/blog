import { FieldValue } from 'firebase/firestore';
import { devCollectionRefName } from '../../service/firebase/firestore';
import {
  IParagraphData,
  IParagraphDataModel,
  ParagraphDataModel,
} from './paragraph-data-model';
import { IPostId, PostId } from './post-id';
import { IRefData, IRefDataModel, RefDataModel } from './ref-data-model';

const refData: IRefDataModel = new RefDataModel();
const paragraphData: IParagraphDataModel = new ParagraphDataModel();
const newPostId: IPostId = new PostId();

export const postInitialData: IPostData = {
  // postId: newPostId.createPostId(),
  category: devCollectionRefName,
  order: '',
  series: '',
  dateTime: '',
  title: '',
  tagDataArray: [],
  paragraphDataArray: [paragraphData.createNewParagraphData()],
  refDataArray: [refData.createNewRefData()],
  status: 'draft',
  // serverTimestamp: '',
};

export interface IPostData {
  // postId: string;
  category: string;
  order: string;
  series: string;
  dateTime: string;
  tagDataArray: [];
  title: string;
  paragraphDataArray: IParagraphData[];
  refDataArray: IRefData[];
  status: TStatus;
  // serverTimestamp: any;
}

export type TStatus = 'draft' | 'published' | 'unPublished';
