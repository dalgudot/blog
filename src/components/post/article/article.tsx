import { FC } from 'react';
import {
  IParagraphData,
  TStatus,
} from '../../../redux-toolkit/model/post-data-model';
import TableOfContents, {
  TTableOfContentsData,
} from '../../navigation/table-of-contents/table-of-contents';
import Author from '../author/author';
import Message from './message/message';
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
  tableOfContentsData: TTableOfContentsData[];
};

const Article: FC<Props> = ({
  contentEditable,
  articleTitleWysiwygData,
  wysiwygDataArray,
  tableOfContentsData,
}) => {
  const isTableOfContentsData: boolean = tableOfContentsData.length !== 0;

  return (
    <article>
      <TitleWYSIWYG
        contentEditable={contentEditable}
        title={articleTitleWysiwygData.title}
        dateTime={articleTitleWysiwygData.dateTime}
        status={articleTitleWysiwygData.status}
      />
      {isTableOfContentsData && (
        <TableOfContents tableOfContentsData={tableOfContentsData} />
      )}
      {/* <Author /> */}
      <Message />
      <WYSIWYG
        contentEditable={contentEditable}
        wysiwygDataArray={wysiwygDataArray}
      />
    </article>
  );
};

export default Article;
