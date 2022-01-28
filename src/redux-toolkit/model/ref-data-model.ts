import { uuid } from '../../lib/utils/id';

export interface IRefDataModel {
  createNewRefData: () => IRefData;
}

export class RefDataModel implements IRefDataModel {
  private blockId: string;
  private blockType: 'Link';
  private title: string;
  private url: string;

  constructor() {
    this.blockId = uuid();
    this.blockType = 'Link';
    this.title = '';
    this.url = '';
  }

  // for Data Serealization
  createNewRefData(): IRefData {
    return {
      blockId: this.blockId,
      blockType: this.blockType,
      title: this.title,
      url: this.url,
    };
  }
}

export interface IRefData {
  blockId: string;
  blockType: 'Link';
  title: string;
  url: string;
}
