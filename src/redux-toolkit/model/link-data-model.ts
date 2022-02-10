import { uuid } from '../../lib/utils/id';
import { TCodeLanguage } from './code-data-model';

export interface ILinkDataModel {
  createNewLinkData: () => ILinkData;
}

export class LinkDataModel implements ILinkDataModel {
  private blockId: string;
  private blockType: 'Link';
  private html: string;
  private url: string;
  private codeLanguage: TCodeLanguage;

  constructor() {
    this.blockId = uuid();
    this.blockType = 'Link';
    this.html = '';
    this.url = '';
    this.codeLanguage = 'tsx';
  }

  // for Data Serealization
  createNewLinkData(): ILinkData {
    return {
      blockId: this.blockId,
      blockType: this.blockType,
      html: this.html,
      url: this.url,
      codeLanguage: this.codeLanguage,
    };
  }
}

export interface ILinkData {
  blockId: string;
  blockType: 'Link';
  html: string;
  url: string;
  codeLanguage: TCodeLanguage;
}
