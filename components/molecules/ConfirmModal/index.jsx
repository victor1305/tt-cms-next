import { BasicModal } from '@/components/atoms';

import styles from './ConfirmModal.module.scss';

const ConfirmModal = ({
  handleClose,
  show,
  hasXToClose,
  principalBtn,
  secondaryBtn,
  text,
  principalBtnCopy,
  secondaryBtnCopy
}) => (
  <BasicModal {...{ handleClose, show, hasXToClose }}>
    <div className={styles['confirm-modal']}>
      <p>{text}</p>
      <div>
        {secondaryBtnCopy && (
          <button
            className={`${styles['confirm-modal__btn']} ${styles['confirm-modal__btn--secondary']}`}
            onClick={secondaryBtn}
          >
            {secondaryBtnCopy}
          </button>
        )}
        {principalBtnCopy && (
          <button
            className={`${styles['confirm-modal__btn']} ${styles['confirm-modal__btn--primary']}`}
            onClick={principalBtn}
          >
            {principalBtnCopy}
          </button>
        )}
      </div>
    </div>
  </BasicModal>
);

export default ConfirmModal;
