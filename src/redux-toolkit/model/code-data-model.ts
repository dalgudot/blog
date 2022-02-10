import { uuid } from '../../lib/utils/id';

export interface ICodeDataModel {
  createNewCodeData: () => ICodeData;
}

export class CodeDataModel implements ICodeDataModel {
  private blockId: string;
  private blockType: 'Code';
  private html: string;
  private url: string;
  private codeLanguage: TCodeLanguage;

  constructor() {
    this.blockId = uuid();
    this.blockType = 'Code';
    this.html = '';
    this.url = '';
    this.codeLanguage = 'tsx';
  }

  // for Data Serealization
  createNewCodeData(): ICodeData {
    return {
      blockId: this.blockId,
      blockType: this.blockType,
      html: this.html,
      url: this.url,
      codeLanguage: this.codeLanguage,
    };
  }
}

export interface ICodeData {
  blockId: string;
  blockType: 'Code';
  html: string;
  url: string;
  codeLanguage: TCodeLanguage;
}

export type TCodeLanguage =
  | 'typescript'
  | 'tsx'
  | 'swift'
  | 'css'
  | 'sass'
  | 'scss'
  | 'javascript'
  | 'jsx';
