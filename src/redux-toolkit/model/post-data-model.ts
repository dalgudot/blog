import { devCollectionRefName } from '../../service/firebase/firestore';
import { ITextData, ITextDataModel, TextDataModel } from './text-data-model';
import { ILinkData, ILinkDataModel, LinkDataModel } from './link-data-model';
import { IImageData } from './image-data-model';

const refData: ILinkDataModel = new LinkDataModel();
const paragraphData: ITextDataModel = new TextDataModel();

export const postInitialData: IPostData = {
  category: devCollectionRefName,
  order: '',
  series: '',
  dateTime: '',
  title: '',
  tagDataArray: [],
  wysiwygDataArray: [paragraphData.createNewTextData()], // 초기화는 paragraph 데이터로
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

export type IParagraphData = ITextData | ILinkData | IImageData;
export type TStatus = 'draft' | 'published' | 'unPublished';
