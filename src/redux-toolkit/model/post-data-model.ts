import { devCollectionRefName } from '../../service/firebase/firestore';
import {
  IParagraphData,
  IParagraphDataModel,
  ParagraphDataModel,
} from './paragraph-data-model';
import { IRefData, IRefDataModel, RefDataModel } from './ref-data-model';

const refData: IRefDataModel = new RefDataModel();
const paragraphData: IParagraphDataModel = new ParagraphDataModel();

export const postInitialData: IPostData = {
  category: devCollectionRefName,
  order: '',
  series: '',
  dateTime: '',
  title: '',
  tagDataArray: [],
  paragraphDataArray: [paragraphData.createNewParagraphData()],
  refDataArray: [refData.createNewRefData()],
  status: 'draft',
};

export interface IPostData {
  category: string;
  order: string;
  series: string;
  dateTime: string;
  tagDataArray: [];
  title: string;
  paragraphDataArray: IParagraphData[];
  refDataArray: IRefData[];
  status: 'draft' | 'published' | 'unPublished';
}
