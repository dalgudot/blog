import { FC } from 'react';
import styles from './sponsor.module.scss';
import li__styles from '../../block-wysiwyg/editable-element/link/editable-link-block.module.scss';
import classNames from 'classnames';
import IconNewTap24 from '../../../svg/icon-new-tap-24';

const Sponsor: FC = () => {
  const description: string =
    '글이 도움이 되셨다면 아래 github 후원 페이지에서 후원을 부탁드립니다 :)';

  return (
    <section className={styles.sponsor__section}>
      <h2>후원</h2>
      <p className={styles.description}>{description}</p>
      <li
        className={classNames(
          li__styles.editable__link__block__li,
          li__styles.editable__link__block__li__hover,
          li__styles.box__for__Paragraph__list__type
        )}
      >
        <a
          href='https://github.com/sponsors/dalgudot'
          target='_blank'
          rel='noreferrer'
        >
          <p>후원하러 가기</p>
          <IconNewTap24 color='var(--g1)' />
        </a>
      </li>
    </section>
  );
};

export default Sponsor;
