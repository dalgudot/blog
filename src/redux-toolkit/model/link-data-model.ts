import { uuid } from '../../lib/utils/id';

export interface ILinkDataModel {
  createNewLinkData: () => ILinkData;
}

export class LinkDataModel implements ILinkDataModel {
  private blockId: string;
  private blockType: 'Link';
  private html: string;
  private url: string;

  constructor() {
    this.blockId = uuid();
    this.blockType = 'Link';
    this.html = '';
    this.url = '';
  }

  // for Data Serealization
  createNewLinkData(): ILinkData {
    return {
      blockId: this.blockId,
      blockType: this.blockType,
      html: this.html,
      url: this.url,
    };
  }
}

export interface ILinkData {
  blockId: string;
  blockType: 'Link';
  html: string;
  url: string;
}
