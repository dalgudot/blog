import { NextPage } from 'next';
import Profile from '../components/contact/profile';
import Email from '../components/contact/email';
import Career from '../components/contact/career';
import styles from '../components/contact/contact.module.scss';
import { useUpdateVisitors } from '../lib/hooks/useUpdateVisitors';
import { useMixpanelTrack } from '../lib/hooks/useMixpanelTrack';

const Contact: NextPage = () => {
  useUpdateVisitors();
  useMixpanelTrack('view_contact_page');

  return (
    <main className={styles.contact__main}>
      <Profile />
      <Email />
      <Career />
    </main>
  );
};

export default Contact;
