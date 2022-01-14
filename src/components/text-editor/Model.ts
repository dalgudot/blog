import { uuid } from '../../lib/utils/id';

export interface INewBlockContent {
  uuid: string;
  tagName: textTagName;
}

export class NewBlockContent implements INewBlockContent {
  uuid: string;
  tagName: textTagName;

  constructor() {
    this.uuid = uuid();
    this.tagName = 'p';
  }
}
