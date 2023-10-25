'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { defaultClientForm } from '@/lib/constants';
import { configDatePicker } from '@/lib/datePickerConfig';
import { createClient } from '@/lib/https';

import { BasicModal } from '@/components/atoms';

import styles from './ClientModal.module.scss';

const ClientModal = ({ handleClose, show, token, formSubmitted }) => {
  const [form, setForm] = useState(defaultClientForm);
  const [formErrors, setFormErrors] = useState({
    name: false,
    phoneNumber: false
  });

  const resetForm = () => {
    setForm(defaultClientForm);
    setFormErrors({
      name: false,
      phoneNumber: false
    });
  };

  const validateForm = () => {
    const formValidated = {
      name: !form.name.length > 0,
      phoneNumber: !(
        form.phoneNumber.length === 9 || form.phoneNumber.length === 11
      )
    };
    setFormErrors(formValidated);
    return Object.values(formValidated).some((valor) => valor === true);
  };

  const closeModal = () => {
    resetForm();
    handleClose();
  };

  const saveData = async () => {
    if (validateForm()) return;
    await createClient({ client: form, token });
    formSubmitted();
    resetForm();
  };

  return (
    <BasicModal handleClose={closeModal} {...{ show, hasXToClose: true }}>
      <div className={styles['client-modal']}>
        <h4>Añadir Cliente</h4>
        <div className={styles['client-modal__form-box']}>
          <label>Nombre y Apellido*:</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {formErrors.name && (
            <p className={styles['client-modal__form-error']}>
              Tienes que indicar el nombre
            </p>
          )}
        </div>
        <div className={styles['client-modal__form-box']}>
          <label>Número Teléfono*:</label>
          <input
            type="number"
            value={form.phoneNumber}
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          />
          {formErrors.phoneNumber && (
            <p className={styles['client-modal__form-error']}>
              Hace falta el número de teléfono
            </p>
          )}
        </div>
        <div className={styles['client-modal__form-box']}>
          <label>Fecha Registro*:</label>
          <DatePicker
            {...configDatePicker}
            className="date-input"
            dateFormat="MM/yyyy"
            showMonthYearPicker
            showFullMonthYearPicker
            selected={form.registerDate}
            onChange={(e) =>
              setForm({ ...form, registerDate: e || new Date() })
            }
            showPopperArrow={false}
          />
        </div>
        <div className={styles['client-modal__form-box']}>
          <label>Referido:</label>
          <input
            type="text"
            value={form.referred}
            onChange={(e) => setForm({ ...form, referred: e.target.value })}
          />
        </div>
        <div className={styles['client-modal__btn-box']}>
          <button className="form-btn form-btn--primary" onClick={saveData}>
            Añadir
          </button>
        </div>
      </div>
    </BasicModal>
  );
};

export default ClientModal;
