import { tid } from './../../lib/utils/tid';

type TnewBlockContent = {
  tid: string;
  tagName: textTagName;
  text: string;
};

export const newBlockContent: TnewBlockContent = {
  tid: tid(),
  tagName: 'p',
  text: '',
};
