'use client';

import { useState } from 'react';

import { defaultParameterModal, parametersArr } from '@/lib/constants';
import { createParameter } from '@/lib/https';

import { BasicModal } from '@/components/atoms';

import styles from './ParameterModal.module.scss';

const ParameterModal = ({ handleClose, show, token, formSubmitted }) => {
  const [form, setForm] = useState(defaultParameterModal);
  const [formErrors, setFormErrors] = useState(false);

  const resetForm = () => {
    setForm(defaultParameterModal);
    setFormErrors(false);
  };

  const closeModal = () => {
    resetForm();
    handleClose();
  };

  const validateForm = () => {
    const errors = Object.values(form).some((value) => value.length === 0);

    setFormErrors(errors);
    return errors;
  };

  const saveData = async () => {
    if (validateForm()) return;
    await createParameter({ parameter: form, token });
    formSubmitted();
    resetForm();
  };

  return (
    <BasicModal handleClose={closeModal} {...{ show, hasXToClose: true }}>
      <div className={styles['parameter-modal']}>
        <h4>Añadir parámetro</h4>
        <div className={styles['parameter-modal__form-box']}>
          <label>Nombre: *</label>
          <input
            type="text"
            name="betName"
            value={form.value || ''}
            onChange={(e) => setForm({ ...form, value: e.target.value })}
          />
        </div>
        <div className={styles['parameter-modal__form-box']}>
          <label>Tipo: *</label>
          <select
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            value={form.type || ''}
          >
            <option>--- Selecciona un parámetro ---</option>
            {parametersArr.map((elm, index) => (
              <option key={index}>{elm}</option>
            ))}
          </select>
        </div>
        {formErrors && (
          <p className={styles['parameter-modal__form-error']}>
            Tienes que rellenar los 2 campos
          </p>
        )}
        <div className={styles['parameter-modal__btn-box']}>
          <button className="form-btn form-btn--primary" onClick={saveData}>
            Crear
          </button>
        </div>
      </div>
    </BasicModal>
  );
};

export default ParameterModal;
