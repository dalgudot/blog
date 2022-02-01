import { uuid } from '../../lib/utils/id';

export interface IImageDataModel {
  createNewImageData: () => IImageData;
}

export class ImageDataModel implements IImageDataModel {
  private blockId: string;
  private blockType: 'Image';
  private html: string;
  private url: string;

  constructor() {
    this.blockId = uuid();
    this.blockType = 'Image';
    this.html = '';
    this.url = '';
  }

  // for Data Serealization
  createNewImageData(): IImageData {
    return {
      blockId: this.blockId,
      blockType: this.blockType,
      html: this.html,
      url: this.url,
    };
  }
}

export interface IImageData {
  blockId: string;
  blockType: 'Image';
  html: string;
  url: string;
}
