// Added 2023.05.13
import { KMONG_LINK, REMINDER_APPSTORE_LINK } from '../../constants/contants';
import IconNewTap24 from '../../svg/icon-new-tap-24';
import IconReminderLogo24 from '../../svg/icon-reminder-logo-24';
import s from './BottomFloatingButton.module.scss';
import { useRouter } from 'next/router';
import mixpanel from 'mixpanel-browser';

export default function BottomFloatingButton() {
  const router = useRouter();
  function sendMixpanelEvent() {
    mixpanel.track('click_BottomFloatingButton', { path: router.asPath });
  }

  return (
    <a
      href={KMONG_LINK}
      target='_blank'
      rel='noreferrer'
      className={s.fixed__positon}
      onClick={sendMixpanelEvent}
    >
      <div className={s.left__side}>
        <div className={s.left__side__text}>
          <h6 className='body2__500'>커리어 에세이 📮</h6>
          <p className='body3__400'>
            과학 기자에서 IT 프로덕트 디자이너가 되기까지
          </p>
        </div>
      </div>

      <IconNewTap24 color='var(--g1)' />
    </a>
  );
}

// 작은 앱 프로젝트 코드 백업
// return (
//   <a
//     href={REMINDER_APPSTORE_LINK}
//     target='_blank'
//     rel='noreferrer'
//     className={s.fixed__positon}
//     onClick={sendMixpanelEvent}
//   >
//     <div className={s.left__side}>
//       <IconReminderLogo24 />
//       <div className={s.left__side__text}>
//         <h6 className='body2__500'>작은 앱 프로젝트</h6>
//         <p className='body3__400'>리마인더 - 오직 필요한 기능만</p>
//       </div>
//     </div>

//     <IconNewTap24 color='var(--g1)' />
//   </a>
// );
