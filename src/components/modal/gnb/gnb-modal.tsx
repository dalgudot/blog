import { FC, memo } from 'react';
import styles from './gnb-modal.module.scss';

type Props = {
  closeModal: () => void;
};

const GNBModal: FC<Props> = ({ closeModal }) => {
  return <>GNBModal</>;
};

export default memo(GNBModal);
