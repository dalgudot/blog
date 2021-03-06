import { uuid } from '../../lib/utils/id';
import { TCodeLanguage } from './code-data-model';

export interface IImageDataModel {
  createNewImageData: () => IImageData;
}

export class ImageDataModel implements IImageDataModel {
  private blockId: string;
  private blockType: 'Image';
  private html: string;
  private url: string;
  private codeLanguage: TCodeLanguage;

  constructor() {
    this.blockId = uuid();
    this.blockType = 'Image';
    this.html = '';
    this.url = '';
    this.codeLanguage = 'tsx';
  }

  // for Data Serealization
  createNewImageData(): IImageData {
    return {
      blockId: this.blockId,
      blockType: this.blockType,
      html: this.html,
      url: this.url,
      codeLanguage: this.codeLanguage,
    };
  }
}

export interface IImageData {
  blockId: string;
  blockType: 'Image';
  html: string;
  url: string;
  codeLanguage: TCodeLanguage;
}
