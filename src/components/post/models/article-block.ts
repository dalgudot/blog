import { uuid } from '../../../lib/utils/id';

export type TBlockType =
  | 'Heading1'
  | 'Heading2'
  | 'Heading3'
  | 'Paragraph'
  | 'Code'
  | 'Link';
// | 'iframe'   | 'Image'   | 'Reference'(Link에 포함)

export interface IArticleBlock {
  id: string;
  // type: TblockType;
  text: string;
}

export class ArticleBlock implements IArticleBlock {
  id: string;
  // type: TblockType;
  text: string;

  constructor() {
    this.id = uuid();
    // this.type = 'Paragraph';
    this.text = '';
  }
}

// 각 block에서 text 데이터 등 관리
