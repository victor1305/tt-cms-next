'use client';

import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  beneficiarysList,
  defaultPaymentForm,
  paymentTypes,
  statusPayments
} from '@/lib/constants';
import { configDatePicker } from '@/lib/datePickerConfig';
import { createPayment, editPayment } from '@/lib/https';

import { BasicModal } from '@/components/atoms';

import styles from './PaymentModal.module.scss';

const PaymentModal = ({
  handleClose,
  show,
  formData,
  token,
  formSubmitted,
  isEdit,
  clientsList,
  resetPayment
}) => {
  const [form, setForm] = useState(defaultPaymentForm);
  const [formErrors, setFormErrors] = useState({
    client: false,
    type: false,
    beneficiary: false
  });

  const resetForm = () => {
    setForm(defaultPaymentForm);
    resetPayment(defaultPaymentForm);
    setFormErrors({
      client: false,
      type: false,
      beneficiary: false
    });
  };

  const validateForm = () => {
    const formValidated = {
      name: !form.client.length > 0,
      type: !form.type.length > 0,
      beneficiary: !form.beneficiary.length > 0
    };
    setFormErrors(formValidated);
    return Object.values(formValidated).some((valor) => valor === true);
  };

  const closeModal = () => {
    handleClose();
    resetForm();
  };

  const saveData = async () => {
    if (validateForm()) return;
    if (isEdit) {
      await editPayment({ payment: form, token, paymentId: form._id, beneficiaryId: form.beneficiaryId[0] });
    } else {
      await createPayment({ payment: form, token });
    }
    formSubmitted();
    resetForm();
  };

  useEffect(() => {
    if (isEdit && formData) {
      setForm(formData);
    }
  }, [isEdit, formData]);

  return (
    <BasicModal handleClose={closeModal} {...{ show, hasXToClose: true }}>
      <div className={styles['payment-modal']}>
        <h4>{!isEdit ? "Añadir Pago" : `Editar Pago de ${form.client[0]}`}</h4>
        {!isEdit && (
          <div className={styles['payment-modal__form-box']}>
            <label>Cliente*:</label>
            <select
              onChange={(e) => setForm({ ...form, client: e.target.value })}
              value={form.client || ''}
            >
              <option>--- Selecciona un cliente ---</option>
              {clientsList.map((elm, index) => (
                <option key={index} value={elm._id}>
                  {elm.name}
                </option>
              ))}
            </select>
            {formErrors.client && (
              <p className={styles['payment-modal__form-error']}>
                Tienes que seleccionar un cliente
              </p>
            )}
          </div>
        )}
        <div className={styles['payment-modal__form-box']}>
          <label>Estado*:</label>
          <select
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            value={form.status || ''}
          >
            {statusPayments.map((elm, index) => (
              <option key={index}>{elm}</option>
            ))}
          </select>
        </div>
        <div className={styles['payment-modal__form-box']}>
          <label>Mes del pago*:</label>
          <DatePicker
            {...configDatePicker}
            className="date-input"
            dateFormat="MM/yyyy"
            showMonthYearPicker
            showFullMonthYearPicker
            selected={Date.parse(form.date) || new Date()}
            onChange={(e) => setForm({ ...form, date: e || new Date() })}
            showPopperArrow={false}
          />
        </div>
        <div className={styles['payment-modal__form-box']}>
          <label>Precio:</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>
        <div className={styles['payment-modal__form-box']}>
          <label>Forma Pago*:</label>
          <select
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            value={form.type || ''}
          >
            <option>--- Selecciona un método de pago ---</option>
            {paymentTypes.map((elm, index) => (
              <option key={index}>{elm}</option>
            ))}
          </select>
          {formErrors.type && (
            <p className={styles['payment-modal__form-error']}>
              Tienes que seleccionar un método de pago
            </p>
          )}
        </div>
        <div className={styles['payment-modal__form-box']}>
          <label>Asignación de pago*:</label>
          <select
            onChange={(e) => setForm({ ...form, beneficiary: e.target.value })}
            value={form.beneficiary.length > 1 ? form.beneficiary : form.beneficiaryId?.length === 1 ? form.beneficiaryId[0] : form.beneficiary || ''}
          >
            <option>--- Asigna el pago ---</option>
            {beneficiarysList.map((elm) => (
              <option key={elm._id} value={elm._id}>
                {elm.name}
              </option>
            ))}
          </select>
          {formErrors.beneficiary && (
            <p className={styles['payment-modal__form-error']}>
              Tienes que asignar un beneficiario
            </p>
          )}
        </div>
        <div className={styles['payment-modal__form-box']}>
          <label>Notas:</label>
          <input
            type="text"
            value={form.information || ''}
            onChange={(e) => setForm({ ...form, information: e.target.value })}
          />
        </div>
        <div className={styles['payment-modal__btn-box']}>
          <button className="form-btn form-btn--primary" onClick={saveData}>
            {isEdit ? 'Editar' : 'Añadir'}
          </button>
        </div>
      </div>
    </BasicModal>
  );
};

export default PaymentModal;
