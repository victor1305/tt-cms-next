'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { bookiesNames, defaultPersonalBetForm } from '@/lib/constants';
import { createPersonalBet, editPersonalBet } from '@/lib/https';

import { BasicModal } from '@/components/atoms';

import styles from './PersonalBet.module.scss';

const PersonalBet = ({ formData, handleClose, isEdit, show, token, id }) => {
  const [form, setForm] = useState(isEdit ? formData : defaultPersonalBetForm);
  const [formErrors, setFormErrors] = useState(false);

  const resetForm = () => {
    setForm(defaultPersonalBetForm);
    setFormErrors(false);
  };

  const validateForm = () => {
    const bookieValidated = form.bookie.length;
    setFormErrors(!bookieValidated);
    return bookieValidated;
  };

  const closeModal = () => {
    resetForm();
    handleClose();
  };

  const saveData = async () => {
    if (!validateForm()) return;
    if (isEdit) {
      await editPersonalBet({ form, token });
    } else {
      await createPersonalBet({ personalBet: form, isEdit, token, id });
    }
    closeModal();
  };

  return (
    <BasicModal handleClose={closeModal} {...{ show, hasXToClose: true }}>
      <div className={styles['personal-bet']}>
        <h4>{isEdit ? 'Editar' : 'Crear'} Apuesta</h4>
        <div className={styles['personal-bet__form-box']}>
          <label>Bookie *:</label>
          <select
            onChange={(e) => setForm({ ...form, bookie: e.target.value })}
            value={form.bookie}
          >
            <option>--- Selecciona una bookie ---</option>
            {bookiesNames.map((elm, index) => (
              <option key={index}>{elm}</option>
            ))}
          </select>
          {formErrors && (
            <p className={styles['personal-bet__form-error']}>
              Tienes que seleccionar una bookie
            </p>
          )}
        </div>
        <div className={styles['personal-bet__form-box']}>
          <label>Saldo Inicial:</label>
          <input
            type="number"
            value={form.initialBalance}
            onChange={(e) =>
              setForm({ ...form, initialBalance: e.target.value })
            }
          />
        </div>
        <div className={styles['personal-bet__form-box']}>
          <label>Saldo Final:</label>
          <input
            type="number"
            value={form.finalBalance}
            onChange={(e) => setForm({ ...form, finalBalance: e.target.value })}
          />
        </div>
        <div className={styles['personal-bet__form-box']}>
          <label>Depósitos:</label>
          <input
            type="number"
            value={form.deposits}
            onChange={(e) => setForm({ ...form, deposits: e.target.value })}
          />
        </div>
        <div className={styles['personal-bet__form-box']}>
          <label>Reintegros:</label>
          <input
            type="number"
            value={form.withdraws}
            onChange={(e) => setForm({ ...form, withdraws: e.target.value })}
          />
        </div>
        <div className={styles['personal-bet__form-box']}>
          <label>Fecha:</label>
          <DatePicker
            className="date-input"
            dateFormat="dd/MM/yyyy"
            selected={form.date}
            onChange={(e) => setForm({ ...form, date: e })}
            showPopperArrow={false}
          />
        </div>
        <div className={styles['personal-bet__btn-box']}>
          <button className="form-btn form-btn--primary" onClick={saveData}>
            {isEdit ? 'Editar' : 'Crear'}
          </button>
        </div>
      </div>
    </BasicModal>
  );
};

export default PersonalBet;
