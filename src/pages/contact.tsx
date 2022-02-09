import { NextPage } from 'next';
import Profile from '../components/contact/profile';
import Email from '../components/contact/email';
import Career from '../components/contact/career';
import styles from '../components/contact/contact.module.scss';
import { useUpdateVisitors } from '../lib/hooks/useUpdateVisitors';

const Contact: NextPage = () => {
  useUpdateVisitors();

  return (
    <main className={styles.contact__main}>
      <Profile />
      <Email />
      <Career />
    </main>
  );
};

export default Contact;
