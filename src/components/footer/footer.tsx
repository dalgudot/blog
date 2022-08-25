import { FC } from 'react';
import styles from './footer.module.scss';
import LeftSide from './left-side';
import RightSide from './right-side';

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <LeftSide />
      <RightSide />
    </footer>
  );
};

export default Footer;
