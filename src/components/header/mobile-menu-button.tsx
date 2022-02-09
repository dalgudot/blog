import { FC } from 'react';
import { useModal } from '../../lib/hooks/useModal';
import IconMenu24 from '../../svg/icon-menu-24';
import styles from './header.module.scss';

const MobileMenuButton: FC = () => {
  const { openModal } = useModal('Mobile GNB');

  return (
    <>
      <button
        onClick={() => openModal()}
        className={styles.header__right__menu__button}
      >
        <IconMenu24 color='var(--g1)' />
      </button>
    </>
  );
};

export default MobileMenuButton;
