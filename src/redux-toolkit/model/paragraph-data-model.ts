import { uuid } from '../../lib/utils/id';

export type TBlockTextType = 'Heading1' | 'Heading2' | 'Heading3' | 'Paragraph';

export type TBlockType = TBlockTextType | 'Code' | 'Link';

export interface IParagraphDataModel {
  createNewParagraphData: () => IParagraphData;
}

export class ParagraphDataModel implements IParagraphDataModel {
  private blockId: string;
  private blockType: TBlockType;
  private html: string;

  constructor() {
    this.blockId = uuid();
    this.blockType = 'Paragraph';
    this.html = '';
  }

  // for Data Serealization
  createNewParagraphData(): IParagraphData {
    return {
      blockId: this.blockId,
      blockType: this.blockType,
      html: this.html,
    };
  }
}

export interface IParagraphData {
  blockId: string;
  blockType: TBlockType;
  html: string;
}
