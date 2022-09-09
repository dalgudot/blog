import { FC } from 'react';
import styles from './subscription.module.scss';
import li__styles from '../../block-wysiwyg/editable-element/link/editable-link-block.module.scss';
import classNames from 'classnames';
import IconNewTap24 from '../../../svg/icon-new-tap-24';

const Subscription: FC = () => {
  const description: string = '새로운 글이나 소식을 이메일로 알려드립니다 :)';

  return (
    <>
      <section className={styles.subscription__section}>
        <h2>구독</h2>
        <p className={styles.description}>{description}</p>
        <li
          className={classNames(
            li__styles.editable__link__block__li,
            li__styles.editable__link__block__li__hover,
            li__styles.box__for__Paragraph__list__type
          )}
        >
          <a
            href='https://page.stibee.com/subscriptions/96987'
            target='_blank'
            rel='noreferrer'
          >
            <p>구독 신청</p>
            <IconNewTap24 color='var(--g1)' />
          </a>
        </li>
      </section>
    </>
  );
};

export default Subscription;
