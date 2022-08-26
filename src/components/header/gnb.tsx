import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, memo } from 'react';
import { useIsAdmin } from '../../lib/hooks/useIsAdmin';
import styles from './header.module.scss';
import modalStyles from '../modal/modal.module.scss';
import { useRecoilValue } from 'recoil';
import { modalState } from '../../lib/hooks/useModal';

type Props = {
  closeModal?: () => void;
};

type TGNBList = {
  label: string;
  target: '_self' | '_blank';
  href: string;
};

const GNB: FC<Props> = ({ closeModal }) => {
  const { isAdmin } = useIsAdmin();
  const isModal = useRecoilValue(modalState);

  const gnbList: TGNBList[] = [
    {
      label: '기록',
      target: '_self',
      href: '/',
    },
    {
      label: 'UX 수집',
      target: '_self',
      href: '/ux-collection',
    },
    // {
    //   label: '이야기',
    //   target: '_self',
    //   href: '/story',
    // },
    {
      label: '연락처',
      target: '_self',
      href: '/contact',
    },
  ];

  const adminList: TGNBList[] = [
    {
      label: '초고 목록',
      target: '_self',
      href: '/draft/list',
    },
    {
      label: '새 글 작성',
      target: '_self',
      href: '/draft/new',
    },
  ];

  const isModalOpenAnimation =
    closeModal && isModal.activeAnimation && isModal.open;

  const isModalCloseAnimation =
    closeModal && isModal.activeAnimation && !isModal.open;

  return (
    <>
      <nav
        className={classNames(
          styles.gnb__list__nav,
          isModalOpenAnimation &&
            modalStyles.modal__open__background__transition,
          isModalCloseAnimation &&
            modalStyles.modal__close__background__transition
        )}
      >
        <ul>
          {gnbList.map((list) => (
            <GNBList key={list.href} list={list} closeModal={closeModal} />
          ))}
          {isAdmin &&
            adminList.map((list) => (
              <GNBList key={list.href} list={list} closeModal={closeModal} />
            ))}
        </ul>
      </nav>
      {/* {closeModal && (
        <button
          onClick={() => closeModal()}
          className={classNames(
            styles.gnb__mobile__modal__close__button,
            isModalOpenAnimation &&
              modalStyles.modal__open__background__transition,
            isModalCloseAnimation &&
              modalStyles.modal__close__background__transition
          )}
        >
          닫기
        </button>
      )} */}
    </>
  );
};

export default memo(GNB);

type GNBListProps = {
  list: TGNBList;
  closeModal?: () => void;
};

const GNBList: FC<GNBListProps> = ({ list, closeModal }) => {
  const router = useRouter();
  const pathname = router.pathname;
  const currentStatus =
    pathname === '/' || pathname === '/[category]'
      ? '기록'
      : pathname === '/ux-collection'
      ? 'UX 수집'
      : pathname === '/story'
      ? '이야기'
      : pathname === '/contact'
      ? '연락처'
      : pathname === '/draft/list'
      ? '초고 목록'
      : pathname === '/draft/new'
      ? '새 글 작성'
      : null;

  const isSelected = currentStatus === list.label;
  const listClassname = classNames(
    styles.gnb__list__nav__list,
    isSelected && styles.selected__list
  );

  return (
    <>
      <li className={listClassname}>
        {list.target === '_self' ? (
          <Link href={list.href}>
            <a
              onClick={() => {
                closeModal && closeModal();
              }}
            >
              {list.label}
            </a>
          </Link>
        ) : (
          <a
            onClick={() => {
              closeModal && closeModal();
            }}
            href={list.href}
            target={list.target}
          >
            {list.label}
          </a>
        )}
        {isSelected && <div className={styles.under__line} />}
      </li>
    </>
  );
};
