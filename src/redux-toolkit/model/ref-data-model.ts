import { uuid } from '../../lib/utils/id';

export interface IRefDataModel {
  createNewRefData: () => IRefData;
}

export class RefDataModel implements IRefDataModel {
  private blockId: string;
  private title: string;
  private url: string;

  constructor() {
    this.blockId = uuid();
    this.title = '';
    this.url = '';
  }

  // for Data Serealization
  createNewRefData(): IRefData {
    return {
      blockId: this.blockId,
      title: this.title,
      url: this.url,
    };
  }
}

export interface IRefData {
  blockId: string;
  title: string;
  url: string;
}
