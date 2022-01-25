import { uuid } from '../../lib/utils/id';

export interface IRefData {
  blockId: string;
  title: string;
  url: string;
}

export class RefData implements IRefData {
  blockId: string;
  title: string;
  url: string;

  constructor() {
    this.blockId = uuid();
    this.title = '';
    this.url = '';
  }

  createNewRefData(): IRefData {
    return {
      blockId: this.blockId,
      title: this.title,
      url: this.url,
    };
  }
}
