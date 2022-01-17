import { Timestamp } from 'firebase/firestore';
import { Tuser } from '../../../types/firebase';

export interface IArticleContent {
  title: {
    h1: string;
    category: 'dev' | 'design';
    date: Timestamp;
  };
}

export class ArticleContent implements IArticleContent {
  private user: Tuser;
  title: {
    h1: string;
    category: 'dev' | 'design';
    date: Timestamp;
  };

  constructor(user: Tuser) {
    this.user = user;
    this.title = {
      h1: '',
      category: 'dev',
      date: Timestamp.fromDate(new Date()),
      // https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0#:~:text=dateExample%3A%20Timestamp.fromDate(new%20Date(%22December%2010%2C%201815%22))%2C
    };
  }

  // this.block = {};
  // this.contents = {};
  // this.response = {};
  // this.reference = {};
  // this.seo = {};
}
