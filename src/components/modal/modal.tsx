import classNames from 'classnames';
import { useRouter } from 'next/router';
import { FC, memo, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../../lib/hooks/useModal';
import styles from './modal.module.scss';
import variables from '../../styles/motion.module.scss';
import GNB from '../header/gnb';

const Modal: FC = () => {
  const [isModal, setIsModal] = useRecoilState(modalState);
  const closeModal = () => {
    setIsModal({
      type: isModal.type,
      open: false,
      activeAnimation: isModal.activeAnimation,
    });
  };

  // 조건부 렌더링에서 open, close 애니메이션 실행시키기 위해 필요한 상태
  const closeDuration =
    Number(variables.fade__out__duration.replace('s', '')) * 1000;

  useEffect(() => {
    const closeTimeoutId =
      !isModal.open &&
      setTimeout(() => {
        setIsModal({
          type: isModal.type,
          open: isModal.open,
          activeAnimation: false,
        });
      }, closeDuration);

    return () => {
      closeTimeoutId && clearTimeout(closeTimeoutId);
    };
  }, [isModal.open]);

  const router = useRouter();
  const asPath = router.asPath;

  // useModal을 <Header /> 같은 전역 component에서 호출하면 return이 동작하지 않으므로 <Modal /> 컴포넌트에서 호출
  useEffect(() => {
    if (isModal.open) {
      document.body.style.cssText = `overflow: hidden; touch-action: none; -ms-touch-action: none;`;
    }

    return () => {
      document.body.style.cssText = '';
    };
  }, [isModal.open]);

  // Modal 켜져 있는데 화면 이동하면 Modal 종료
  useEffect(() => {
    isModal && closeModal();
  }, [asPath]);

  const switchModal = () => {
    switch (isModal.type) {
      case 'Mobile GNB':
        return <GNB closeModal={closeModal} />;

      default:
        return <></>;
    }
  };

  return (
    <>
      {isModal.activeAnimation && (
        <>
          {switchModal()}
          <div
            className={classNames(
              styles.modal__common__background,
              styles.modal__open__background__transition,
              !isModal.open && styles.modal__close__background__transition
            )}
            // Mobile GNB은 모바일에서 쓰는 네비게이션이기 때문에 Dim을 눌렀을 때 모달이 꺼지면 좋지 않은 경험을 만듦.
            // onClick={() => isModal.type !== 'Mobile GNB' && closeModal()}
            onClick={() => closeModal()}
          />
        </>
      )}
    </>
  );
};

export default memo(Modal);
