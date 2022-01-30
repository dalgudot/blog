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

  constructor() {
    this.blockId = uuid();
    this.blockType = 'Paragraph';
    this.html = '';
  }

  // for Data Serealization
  createNewTextData(): ITextData {
    return {
      blockId: this.blockId,
      blockType: this.blockType,
      html: this.html,
    };
  }
}

export interface ITextData {
  blockId: string;
  blockType: TBlockTextType;
  html: string;
}
