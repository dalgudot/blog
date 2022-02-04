import { FC } from 'react';
import { useUpdateTotalVisitors } from '../lib/hooks/useUpdateTotalVisitors';

const Story: FC = () => {
  useUpdateTotalVisitors();

  return <>Story</>;
};

export default Story;
