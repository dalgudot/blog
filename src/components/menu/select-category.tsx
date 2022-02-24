import { ChangeEvent, FC } from 'react';
import { useGetClientTempPostData } from '../../lib/hooks/useGetClientTempPostData';
import { useIsAdmin } from '../../lib/hooks/useIsAdmin';
import { setTempPostCategory } from '../../redux-toolkit/slices/temp-post-slice';
import { useAppDispatch } from '../../redux-toolkit/store';
import {
  designCollectionRefName,
  devCollectionRefName,
  storyCollectionRefName,
} from '../../service/firebase/firestore';

const SelectCategory: FC = () => {
  const { isAdmin } = useIsAdmin();
  const dispatch = useAppDispatch();
  const { tempPost } = useGetClientTempPostData();

  const changeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    dispatch(setTempPostCategory(e.target.value));
  };

  return (
    <>
      {isAdmin && (
        <>
          <select value={tempPost.category} onChange={changeCategory}>
            <option value={designCollectionRefName}>design</option>
            <option value={devCollectionRefName}>dev</option>
            <option value={storyCollectionRefName}>story</option>
          </select>

          <style jsx>{`
            select {
              display: flex;
              margin-bottom: 16px;
            }
          `}</style>
        </>
      )}
    </>
  );
};

export default SelectCategory;
