import { ICodeData } from './code-data-model';
import { devCollectionRefName } from '../../service/firebase/firestore';
import {
  ITextData,
  ITextDataModel,
  TBlockTextType,
  TextDataModel,
} from './text-data-model';
import { ILinkData, ILinkDataModel, LinkDataModel } from './link-data-model';
import { IImageData } from './image-data-model';

export type TBlockType = TBlockTextType | 'Image' | 'Code' | 'Link';

const refData: ILinkDataModel = new LinkDataModel();
const paragraphData: ITextDataModel = new TextDataModel();

export const postInitialData: IPostData = {
  category: devCollectionRefName,
  order: '',
  series: '',
  dateTime: '',
  title: '',
  tagDataArray: [],
  wysiwygDataArray: [paragraphData.createNewTextData()],
  linkWysiwygDataArray: [refData.createNewLinkData()],
  status: 'draft',
};

export interface IPostData {
  category: string;
  order: string;
  series: string;
  dateTime: string;
  tagDataArray: [];
  title: string;
  wysiwygDataArray: IParagraphData[];
  linkWysiwygDataArray: ILinkData[];
  status: TStatus;
}

export type IParagraphData = ITextData | ILinkData | IImageData | ICodeData;
export type TStatus = 'draft' | 'published' | 'unPublished';
