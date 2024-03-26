'use client';

import { useState } from 'react';

import { createQuadrantDay } from '@/lib/https';

import { BasicModal } from '@/components/atoms';

import styles from './CreateQuadrantModal.module.scss';

const CreateQuadrantModal = ({
  handleClose,
  show,
  formSubmitted,
  token,
  setIsLoading
}) => {
  const [date, setDate] = useState('');
  const [formErrors, setFormErrors] = useState(false);

  const resetForm = () => {
    setDate('');
    setFormErrors(false);
  };

  const closeModal = () => {
    resetForm();
    handleClose();
  };

  const validateForm = () => {
    const errors = date.length !== 8;

    setFormErrors(errors);
    return errors;
  };

  const saveData = async () => {
    if (validateForm()) return;
    setIsLoading(true);
    handleClose();
    await createQuadrantDay({ date, token });
    formSubmitted();
    resetForm();
  };

  return (
    <BasicModal handleClose={closeModal} {...{ show, hasXToClose: true }}>
      <div className={styles['create-quadrant-modal']}>
        <h4>Crear cuadrante en el CMS</h4>
        <div className={styles['create-quadrant-modal__form-box']}>
          <label>
            Introduce una Fecha en este formato DDMMAAAA (ej: 01072023)
          </label>
          <input
            type="text"
            name="dayDate"
            value={date || ''}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        {formErrors && (
          <p className={styles['create-quadrant-modal__form-error']}>
            Tienes que enviar una fecha en un formato válido DDMMAAAA
          </p>
        )}
        <div className={styles['create-quadrant-modal__btn-box']}>
          <button className="form-btn form-btn--primary" onClick={saveData}>
            Crear
          </button>
        </div>
      </div>
    </BasicModal>
  );
};

export default CreateQuadrantModal;
