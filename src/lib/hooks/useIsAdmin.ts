import { RootState } from './../../redux-toolkit/store';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux-toolkit/store';

export const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { uid } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    uid === process.env.NEXT_PUBLIC_ADMIN_UID
      ? setIsAdmin(true)
      : setIsAdmin(false);
  }, [uid]);

  return { isAdmin, dispatch };
};
