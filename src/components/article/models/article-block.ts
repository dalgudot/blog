import { uuid } from '../../../lib/utils/id';

export type Ttype =
  | 'Title'
  | 'Heading1'
  | 'Heading2'
  | 'Paragraph'
  | 'Space'
  | 'Image'
  | 'Code'
  | 'iframe'
  | 'Link';

export interface IArticleBlock {
  id: string;
  // type: Ttype;
  text: string;
}

export class ArticleBlock implements IArticleBlock {
  id: string;
  // type: Ttype;
  text: string;

  constructor() {
    this.id = uuid();
    // this.type = 'Paragraph';
    this.text = '';
  }
}

// 각 block에서 text 데이터 등 관리
