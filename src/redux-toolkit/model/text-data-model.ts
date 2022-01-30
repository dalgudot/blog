import { uuid } from '../../lib/utils/id';

export type TBlockTextType = 'Heading1' | 'Heading2' | 'Heading3' | 'Paragraph';
export type TBlockType = TBlockTextType | 'Code' | 'Link';

export interface ITextDataModel {
  createNewTextData: () => ITextData;
}

export class TextDataModel implements ITextDataModel {
  private blockId: string;
  private blockType: TBlockTextType;
  private html: string;
  private url: string; // 추후 텍스트 속 링크 연결 가능하게 하기 위해

  constructor() {
    this.blockId = uuid();
    this.blockType = 'Paragraph';
    this.html = '';
    this.url = '';
  }

  // for Data Serealization
  createNewTextData(): ITextData {
    return {
      blockId: this.blockId,
      blockType: this.blockType,
      html: this.html,
      url: this.url,
    };
  }
}

export interface ITextData {
  blockId: string;
  blockType: TBlockTextType;
  html: string;
  url: string;
}
