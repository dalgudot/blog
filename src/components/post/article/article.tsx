import { FC, memo } from 'react';
import {
  IParagraphData,
  TStatus,
} from '../../../redux-toolkit/model/post-data-model';
import WYSIWYG from './paragraph/wysiwyg';
import TitleWYSIWYG from './title/title-wysiwyg';

type Props = {
  contentEditable: boolean;
  articleTitleWysiwygData: {
    title: string;
    dateTime: string;
    status: TStatus;
  };
  wysiwygDataArray: IParagraphData[];
};

const Article: FC<Props> = ({
  contentEditable,
  articleTitleWysiwygData,
  wysiwygDataArray,
}) => {
  return (
    <article>
      {/* 데이터를 Title 데이터 + status 묶어서 전달  */}
      {/* <TitleWYSIWYG
        contentEditable={contentEditable}
        title={articleTitleWysiwygData.title}
        dateTime={articleTitleWysiwygData.dateTime}
        status={articleTitleWysiwygData.status}
      /> */}
      <WYSIWYG
        contentEditable={contentEditable}
        wysiwygDataArray={wysiwygDataArray}
      />
    </article>
  );
};

export default memo(Article);
