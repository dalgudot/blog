import { ChangeEvent, FC } from 'react';
import { useGetClientTempPostData } from '../../lib/hooks/useGetClientTempPostData';
import { setTempPostCategory } from '../../redux-toolkit/slices/temp-post-slice';
import { useAppDispatch } from '../../redux-toolkit/store';
import {
  brandCollectionRefName,
  designCollectionRefName,
  devCollectionRefName,
  storyCollectionRefName,
} from '../../service/firebase/firestore';

const SelectCategory: FC = () => {
  const dispatch = useAppDispatch();
  const { tempPost } = useGetClientTempPostData();

  const changeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    dispatch(setTempPostCategory(e.target.value));
  };

  return (
    <>
      <select value={tempPost.category} onChange={changeCategory}>
        <option value={designCollectionRefName}>design</option>
        <option value={devCollectionRefName}>dev</option>
        <option value={storyCollectionRefName}>story</option>
        <option value={brandCollectionRefName}>brand</option>
      </select>

      <style jsx>{`
        select {
          display: flex;
          margin-bottom: 16px;
        }
      `}</style>
    </>
  );
};

export default SelectCategory;
