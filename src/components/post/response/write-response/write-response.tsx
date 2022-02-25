import { useToast } from '@dalgu/react-toast';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { FC, MouseEvent, useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { getDate } from '../../../../lib/utils/get-date';
import { gradientGenerator } from '../../../../lib/utils/gradientGenerator';
import { postResponseRealtimeDB } from '../../../../service/firebase/realtime-db';
import styles from './write-response.module.scss';

const WriteResponse: FC = () => {
  const [profileGradient, setProfileGradient] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [responseText, setResponseText] = useState<string>('');
  const { showToast } = useToast();

  useEffect(() => {
    setProfileGradient(gradientGenerator());
  }, []);

  useEffect(() => {
    const { dateForDisplay } = getDate();
    setDate(dateForDisplay);
  }, []);

  const changeGradient = () => {
    setProfileGradient(gradientGenerator());
  };

  const isMoreThanMinimumCharacters: boolean = responseText.length > 6;
  const buttonLable = isMoreThanMinimumCharacters
    ? '댓글 등록'
    : '최소 7자 이상 입력해주세요';

  const router = useRouter();
  const asPath = `/${router.query.category}/${router.query.order}`;
  const postResponse = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isResponse = sessionStorage.getItem(`Response of ${asPath}`);

    if (isResponse === null) {
      const responseData = {
        profileGradient,
        date,
        responseText,
      };
      await postResponseRealtimeDB(asPath, responseData);
      showToast('댓글을 등록했습니다 💪');
      setProfileGradient(gradientGenerator());
      setResponseText('');

      // 연속으로 댓글 쓰는 일 방지하기 위해 Session Storage 활용
      sessionStorage.setItem(`Response of ${asPath}`, 'true');
    } else {
      showToast('연속으로 댓글을 쓸 수 없어요 😂');
    }
  };

  return (
    <>
      <form className={styles.write__response}>
        <AnonymousProfile
          profileGradient={profileGradient}
          changeGradient={changeGradient}
          date={date}
        />
        <TextareaAutosize
          value={responseText}
          onChange={(e) => setResponseText(e.target.value)}
          placeholder='공감과 응원의 댓글은 큰 힘이 됩니다.'
          minRows={3}
          minLength={6}
          spellCheck={false}
        />
        <button
          type='button'
          onClick={postResponse}
          className={classNames(
            styles.response__submit__button,
            isMoreThanMinimumCharacters &&
              styles.active__response__submit__button
          )}
          disabled={isMoreThanMinimumCharacters ? false : true}
        >
          {buttonLable}
        </button>
      </form>
    </>
  );
};

export default WriteResponse;

type AnonymousProfileProps = {
  profileGradient: string;
  changeGradient: () => void;
  date: string;
};

const AnonymousProfile: FC<AnonymousProfileProps> = ({
  profileGradient,
  changeGradient,
  date,
}) => {
  return (
    <>
      <div className={styles.anonymous__profile}>
        <div className={styles.anonymous__profile__left__div}>
          <span className='gradient__profile' />
          <p>{date}</p>
        </div>
        <button type='button' onClick={changeGradient}>
          프로필 색 바꾸기
        </button>
      </div>

      <style jsx>{`
        .gradient__profile {
          background: linear-gradient(${profileGradient});
        }

        button {
          color: var(--g1);
        }
      `}</style>
    </>
  );
};
