import { NextPage } from 'next';
import Profile from '../components/contact/profile';
import Email from '../components/contact/email';
import Career from '../components/contact/career';
import styles from '../components/contact/contact.module.scss';

const Contact: NextPage = () => {
  return (
    <main className={styles.main}>
      <Profile />
      <Email />
      <Career />
    </main>
  );
};

export default Contact;
