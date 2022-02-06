import { FC } from 'react';
import IconFacebook24 from '../../../svg/icon-facebook-24';
import IconLinkedIn24 from '../../../svg/icon-linkedin-24';
import IconTwitter24 from '../../../svg/icon-twitter-24';
import styles from './share.module.scss';

const Share: FC = () => {
  return (
    <ul>
      <IconFacebook24 />
      <IconLinkedIn24 />
      <IconTwitter24 />
    </ul>
  );
};

export default Share;
