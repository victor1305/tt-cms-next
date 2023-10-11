'use client';

import classNames from 'classnames';
import { FaTimes } from 'react-icons/fa';

import { useOutsideClick } from '@/lib/hooks';

import styles from './BasicModal.module.scss';

const BasicModal = ({
  show,
  width = '500px',
  handleClose,
  children,
  hasXToClose,
  closeWithClickOut
}) => {
  const ref = useOutsideClick(() => {
    if (closeWithClickOut) handleClose();
  });

  return (
    <div
      className={classNames(styles['basic-modal'], {
        [styles['basic-modal--show']]: show,
        [styles['basic-modal--hidden']]: !show
      })}
    >
      <div
        ref={ref}
        className={styles['basic-modal__content']}
        style={{ width }}
      >
        {hasXToClose && (
          <div className={styles['basic-modal__close-container']}>
            <FaTimes />
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default BasicModal;
