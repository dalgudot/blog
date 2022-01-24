import { FC } from 'react';
import {
  IRefData,
  setRefTitleData,
  setRefUrlData,
} from '../../../redux-toolkit/slices/post-slice';

import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../redux-toolkit/store';
import EditableLink from '../block-wysiwyg/editable-element/link/editable-link';
import styles from './reference-block-wysiwyg.module.scss';

type Props = {
  contentEditable: boolean;
  staticDatas: IRefData[];
};

// <EditableLink />을 활용한 Block WYSIWYG을 만드는 컴포넌트!
const ReferenceBlockWYSIWYG: FC<Props> = ({ contentEditable, staticDatas }) => {
  // 데이터는 2가지: 제목(클라이언트에서 한줄 다 차면 ...으로 표시), 링크

  // 여기서 새로 데이터를 가져와야 부모 컴포넌트 모두가 렌더링 안 됨.
  // const { postAllDatas } = useAppSelector(
  //   (state: RootState) => state.postDates
  // );
  // const datas: IRefData[] = postAllDatas.refDatas;

  // lib화를 위해 dispatch 같은 리덕스 함수는 여기에 있어야 한다.
  const dispatch = useAppDispatch();
  const setTitleData = (data: string, currentIndex: number) => {
    dispatch(setRefTitleData({ data, currentIndex }));
  };
  const setUrlData = (data: string, currentIndex: number) => {
    dispatch(setRefUrlData({ data, currentIndex }));
  };
  // const setTitleData = (data: string, currentIndex: number) => {
  //   dispatch(setRefTitleData({ data, currentIndex }));
  // };
  // const setUrlData = (data: string, currentIndex: number) => {
  //   dispatch(setRefUrlData({ data, currentIndex }));
  // };

  return (
    <>
      <section className={styles.reference__section}>
        <h2>참고 자료</h2>
        <ul>
          {staticDatas.map((data) => (
            <EditableLink
              key={data.title}
              contentEditable={contentEditable}
              datas={staticDatas}
              data={data}
              setTitleData={setTitleData}
              setUrlData={setUrlData}
            />
          ))}
        </ul>
      </section>
    </>
  );
};

export default ReferenceBlockWYSIWYG;
