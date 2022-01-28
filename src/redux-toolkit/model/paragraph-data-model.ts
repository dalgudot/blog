import { uuid } from '../../lib/utils/id';

export interface IParagraphDataModel {
  createNewParagraphData: () => IParagraphData;
}

export class ParagraphDataModel implements IParagraphDataModel {
  private blockId: string;
  private blockType:
    | 'Heading1'
    | 'Heading2'
    | 'Heading3'
    | 'Paragraph'
    | 'Code'
    | 'Link';
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
  blockType:
    | 'Heading1'
    | 'Heading2'
    | 'Heading3'
    | 'Paragraph'
    | 'Code'
    | 'Link';
  html: string;
}
