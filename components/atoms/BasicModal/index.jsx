'use client';

import classNames from 'classnames';
import { FaTimes } from 'react-icons/fa';

import styles from './BasicModal.module.scss';

const BasicModal = ({
  show,
  width = '500px',
  handleClose,
  children,
  hasXToClose
}) => (
  <div
    className={classNames(styles['basic-modal'], {
      [styles['basic-modal--show']]: show,
      [styles['basic-modal--hidden']]: !show
    })}
  >
    <div className={styles['basic-modal__content']} style={{ width }}>
      {hasXToClose && (
        <div className={styles['basic-modal__close-container']}>
          <FaTimes onClick={handleClose} />
        </div>
      )}
      {children}
    </div>
  </div>
);

export default BasicModal;
