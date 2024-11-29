// Added 2023.05.13
import { REMINDER_APPSTORE_LINK } from '../../constants/contants';
import IconNewTap24 from '../../svg/icon-new-tap-24';
import IconReminderLogo24 from '../../svg/icon-reminder-logo-24';
import s from './BottomFloatingButton.module.scss';

export default function BottomFloatingButton() {
  return (
    <a
      href={REMINDER_APPSTORE_LINK}
      target='_blank'
      rel='noreferrer'
      className={s.fixed__positon}
    >
      <div className={s.left__side}>
        <IconReminderLogo24 />
        <div className={s.left__side__text}>
          <h6 className='body1__500'>작은 앱 프로젝트</h6>
          <p className='body3__400'>리마인더 - 오직 필요한 기능만</p>
        </div>
      </div>

      <IconNewTap24 color='var(--g8)' />
    </a>
  );
}
