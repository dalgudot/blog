import { atom, useRecoilState } from 'recoil';

type modalType = 'Mobile GNB';

export const modalState = atom<{
  type: modalType;
  open: boolean;
}>({
  key: 'modal',
  default: { type: 'Mobile GNB', open: false },
});

export const useModal = (type: modalType) => {
  const [isModal, setIsModal] = useRecoilState(modalState);
  const openModal = () => {
    isModal.open === false && setIsModal({ type, open: true });
  };

  return {
    openModal,
  };
};
