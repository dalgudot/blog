import { Timestamp } from 'firebase/firestore';
import { uuid } from '../../lib/utils/id';
import { Tuser } from '../../type/firebase';

export interface IArticleContent {
  blockId: string;
  blockType: Tblock;
  tagName: TtextTagName;
  title: {
    h1: string;
    category: '디자인' | '개발' | 'design';
    date: Timestamp;
  };
}

export class ArticleContent implements IArticleContent {
  private user: Tuser;
  blockId: string;
  blockType: Tblock;
  tagName: TtextTagName;
  title: {
    h1: string;
    category: '디자인' | '개발' | 'design';
    date: Timestamp;
  };

  constructor(user: Tuser) {
    this.user = user;
    this.blockId = uuid();
    this.blockType = 'paragraph';
    this.tagName = 'p';
    this.title = {
      h1: '',
      category: 'design',
      date: Timestamp.fromDate(new Date()),
      // https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0#:~:text=dateExample%3A%20Timestamp.fromDate(new%20Date(%22December%2010%2C%201815%22))%2C
    };

    // this.block = {};
    // this.contents = {};
    // this.response = {};
    // this.reference = {};
    // this.seo = {};
  }
}

interface IBlockContents {}

export class BlockContents implements IBlockContents {}
