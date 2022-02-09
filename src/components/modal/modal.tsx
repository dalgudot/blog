import classNames from 'classnames';
import { useRouter } from 'next/router';
import { FC, memo, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../../lib/hooks/useModal';
import GNBModal from './gnb/gnb-modal';
import styles from './modal.module.scss';
import variables from '../../styles/motion.module.scss';

const Modal: FC = () => {
  const [isModal, setIsModal] = useRecoilState(modalState);
  const closeModal = () => {
    setIsModal({ type: isModal.type, open: false });
  };

  // 조건부 렌더링에서 open, close 애니메이션 실행시키기 위해 필요한 상태
  const [animationActive, setAnimationActive] = useState(false);
  const closeDuration =
    Number(variables.modal__close__background__transition.replace('s', '')) *
    1000;

  useEffect(() => {
    isModal.open && setAnimationActive(true);
    const closeTimeoutId =
      !isModal.open &&
      setTimeout(() => {
        setAnimationActive(false);
      }, closeDuration);

    return () => {
      // openTimeoutId && clearTimeout(openTimeoutId);
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
        return <GNBModal closeModal={closeModal} />;

      default:
        return <></>;
    }
  };

  return (
    <>
      {animationActive && (
        <>
          {switchModal()}
          <button
            className={classNames(
              styles.modal__common__background,
              styles.modal__open__background__transition,
              !isModal.open && styles.modal__close__background__transition
            )}
            onClick={() => closeModal()}
          />
        </>
      )}
    </>
  );
};

export default memo(Modal);
