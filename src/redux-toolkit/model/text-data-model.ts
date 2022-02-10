import { uuid } from '../../lib/utils/id';
import { TCodeLanguage } from './code-data-model';

export type TBlockTextType = 'Heading1' | 'Heading2' | 'Heading3' | 'Paragraph';

export interface ITextDataModel {
  createNewTextData: () => ITextData;
}

export class TextDataModel implements ITextDataModel {
  private blockId: string;
  private blockType: TBlockTextType;
  private html: string;
  private url: string;
  private codeLanguage: TCodeLanguage;

  constructor() {
    this.blockId = uuid();
    this.blockType = 'Paragraph';
    this.html = '';
    this.url = '';
    this.codeLanguage = 'tsx';
  }

  // for Data Serealization
  createNewTextData(): ITextData {
    return {
      blockId: this.blockId,
      blockType: this.blockType,
      html: this.html,
      url: this.url,
      codeLanguage: this.codeLanguage,
    };
  }
}

export interface ITextData {
  blockId: string;
  blockType: TBlockTextType;
  html: string;
  url: string;
  codeLanguage: TCodeLanguage;
}
