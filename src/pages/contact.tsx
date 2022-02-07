import { NextPage } from 'next';
import Profile from '../components/contact/profile';
import Email from '../components/contact/email';
import Career from '../components/contact/career';

const Contact: NextPage = () => {
  return (
    <>
      <Profile />
      <Email />
      <Career />
    </>
  );
};

export default Contact;
