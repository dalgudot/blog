import { RootState } from './../../redux-toolkit/store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../redux-toolkit/store';

export const useCheckAdminPage = () => {
  const router = useRouter();
  const checkAdminPage = (): boolean => {
    const extractAdminPath = router.pathname.substring(0, 6);
    return extractAdminPath === '/admin' ? true : false;
  };
  const { uid } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    const adminPage: boolean = checkAdminPage();

    if (adminPage && uid !== process.env.NEXT_PUBLIC_ADMIN_UID) {
      router.push('/admin');
    }
  }, [router.pathname]);
};
