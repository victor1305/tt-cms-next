'use client';

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  betFormErrorsDefault,
  bookiesNames,
  defaultBetForm,
  statusBets
} from '@/lib/constants';
import { configDatePicker } from '@/lib/datePickerConfig';
import { createBet, editBet } from '@/lib/https';

import { BasicModal } from '@/components/atoms';

import styles from './BetModal.module.scss';

const BetModal = ({
  formData,
  handleClose,
  isEdit,
  setIsLoading,
  show,
  token,
  resetBet,
  formSubmitted,
  racecourses,
  stakes,
  codes
}) => {
  const [form, setForm] = useState(defaultBetForm);
  const [formErrors, setFormErrors] = useState(betFormErrorsDefault);

  const resetForm = () => {
    setForm(defaultBetForm);
    if (isEdit) resetBet(defaultBetForm);
    setFormErrors(betFormErrorsDefault);
  };

  const closeModal = () => {
    resetForm();
    handleClose();
  };

  const validateForm = () => {
    const errors = {
      bookie: !form.bookie.length,
      racecourse: !form.racecourse.length,
      race: !form.race.length,
      betName: !form.betName.length,
      stake: !(form.stake).toString().length,
      price: !(form.price).toString().length,
      betCode: !form.betCode.length
    };

    setFormErrors(errors);
    return Object.values(errors).some(value => value === true);
  };

  const saveData = async () => {
    if (validateForm()) return;
    closeModal();
    setIsLoading(true);
    if (isEdit) {
      const res = await editBet({ bet: form, token, betId: form._id });
      formSubmitted(res);
    } else {
      const res = await createBet({ bet: form, token });
      formSubmitted(res);
    }
  };

  useEffect(() => {
    if (isEdit && formData) {
      setForm(formData);
    }
  }, [isEdit, formData]);

  return (
    <BasicModal handleClose={closeModal} {...{ show, hasXToClose: true }}>
      <div className={styles['bet-modal']}>
        <h4>{isEdit ? 'Editar' : 'Crear'} Apuesta</h4>
        <div className={styles['bet-modal__form-box']}>
          <label>Bookie: *</label>
          <select
            onChange={(e) => setForm({ ...form, bookie: e.target.value })}
            value={form.bookie || ''}
          >
            <option>--- Selecciona una bookie ---</option>
            {bookiesNames.map((elm, index) => (
              <option key={index}>{elm}</option>
            ))}
          </select>
          {formErrors.bookie && (
            <p className={styles['bet-modal__form-error']}>
              Tienes que seleccionar una bookie
            </p>
          )}
        </div>
        <div className={styles['bet-modal__form-box']}>
          <label>Hipódromo: *</label>
          <select
            onChange={(e) => setForm({ ...form, racecourse: e.target.value })}
            value={form.racecourse || ''}
          >
            <option>--- Selecciona un hipódromo ---</option>
            {racecourses.map((elm, index) => (
              <option key={index}>{elm.racecourse}</option>
            ))}
          </select>
          {formErrors.racecourse && (
            <p className={styles['bet-modal__form-error']}>
              Tienes que seleccionar un hipódromo
            </p>
          )}
        </div>
        <div className={styles['bet-modal__form-box']}>
          <label>Carrera: *</label>
          <input
            type="text"
            name="race"
            value={form.race || ''}
            onChange={(e) => setForm({ ...form, race: e.target.value })}
          />
          {formErrors.race && (
            <p className={styles['bet-modal__form-error']}>
              Tienes que indicar el numero de carrera
            </p>
          )}
        </div>
        <div className={styles['bet-modal__form-box']}>
          <label>Apuesta: *</label>
          <input
            type="text"
            name="betName"
            value={form.betName || ''}
            onChange={(e) => setForm({ ...form, betName: e.target.value })}
          />
          {formErrors.betName && (
            <p className={styles['bet-modal__form-error']}>
              Tienes que definir la apuesta
            </p>
          )}
        </div>
        <div className={styles['bet-modal__form-box']}>
          <label>Stake: *</label>
          <select
            onChange={(e) => setForm({ ...form, stake: e.target.value })}
            value={form.stake || ''}
          >
            <option>--- Selecciona un stake ---</option>
            {stakes.map((elm, index) => (
              <option key={index}>{elm.stake}</option>
            ))}
          </select>
          {formErrors.stake && (
            <p className={styles['bet-modal__form-error']}>
              Tienes que seleccionar un stake
            </p>
          )}
        </div>
        <div className={styles['bet-modal__form-box']}>
          <label>Cuota: *</label>
          <input
            type="text"
            value={form.price || ''}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          {formErrors.price && (
            <p className={styles['bet-modal__form-error']}>
              Tienes que poner la cuota
            </p>
          )}
        </div>
        <div className={styles['bet-modal__form-box']}>
          <label>Código: *</label>
          <select
            onChange={(e) => setForm({ ...form, betCode: e.target.value })}
            value={form.betCode || ''}
          >
            <option>--- Selecciona un código ---</option>
            {codes.map((elm, index) => (
              <option key={index}>{elm.betCode}</option>
            ))}
          </select>
          {formErrors.betCode && (
            <p className={styles['bet-modal__form-error']}>
              Tienes que seleccionar un código de carrera
            </p>
          )}
        </div>
        <div className={styles['bet-modal__form-box']}>
          <label>Fecha:</label>
          <DatePicker
            {...configDatePicker}
            className="date-input"
            selected={Date.parse(form.date)}
            onChange={(e) => setForm({ ...form, date: e || new Date() })}
            showPopperArrow={false}
          />
        </div>
        <div className={styles['bet-modal__form-box']}>
          <label>Posición:</label>
          <input
            type="text"
            name="position"
            value={form.position || ''}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
          />
        </div>
        <div className={styles['bet-modal__form-box']}>
          <label>Estado:</label>
          <select
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            value={form.status || ''}
          >
            <option>--- Selecciona un Estado ---</option>
            {statusBets.map((elm, index) => (
              <option key={index}>{elm}</option>
            ))}
          </select>
        </div>
        <div className={styles['bet-modal__btn-box']}>
          <button className="form-btn form-btn--primary" onClick={saveData}>
            {isEdit ? 'Editar' : 'Crear'}
          </button>
        </div>
      </div>
    </BasicModal>
  );
};

export default BetModal;