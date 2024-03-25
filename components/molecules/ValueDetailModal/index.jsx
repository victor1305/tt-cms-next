'use client';

import { useState, useEffect } from 'react';
import { TbEdit } from 'react-icons/tb';

import { editValue } from '@/lib/https';

import { BasicModal } from '@/components/atoms';

import styles from './ValueDetailModal.module.scss';

const ValueDetailModal = ({
  data,
  handleClose,
  show,
  token,
  formSubmitted
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(data.value);

  const closeModal = () => {
    setIsEditMode(false);
    handleClose();
  };

  const showDateFormatted = () => {
    const date = new Date(data.date);
    const year = date.getFullYear();

    if (year >= 2000) {
      const formattedDate = [
        String(date.getDate()).padStart(2, '0'),
        String(date.getMonth() + 1).padStart(2, '0'),
        year
      ].join('-');

      return formattedDate;
    } else {
      return 'Fecha no disponible';
    }
  };

  const saveData = async () => {
    if (value.length) {
      const res = await editValue({ value, token, id: data._id });
      formSubmitted(value, res._id);
      closeModal();
    }
  };

  useEffect(() => {
    setValue(data.value);
  }, [data.value]);

  return (
    <BasicModal {...{ show, handleClose: closeModal, hasXToClose: true }}>
      {isEditMode ? (
        <div className={styles['value-detail-modal']}>
          <h4>Detalle de valor</h4>
          <div className={styles['value-detail-modal__form-box']}>
            <label>Valor: *</label>
            <input
              type="text"
              name="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className={styles['value-detail-modal__btn-box']}>
            <button className="form-btn form-btn--primary" onClick={saveData}>
              Guardar
            </button>
          </div>
        </div>
      ) : (
        <div className={styles['value-detail-modal']}>
          <h4>Detalle de valor</h4>
          {data.racecourse && (
            <p>
              Hipodrómo: <span>{data.racecourse}</span>
            </p>
          )}
          {data.distance && (
            <p>
              Distancia: <span>{data.distance}</span>
            </p>
          )}
          {data.jockey && (
            <p>
              Jockey: <span>{data.jockey}</span>
            </p>
          )}
          {data.trainer && (
            <p>
              Preparación: <span>{data.trainer}</span>
            </p>
          )}
          <p>
            Barro / Pista lenta: <span>{data.mud ? 'Sí' : 'No'}</span>
          </p>
          {data.measurement && (
            <p>
              Medición: <span>{data.measurement}</span>
            </p>
          )}
          <p>
            Superficie: <span>{data.surface}</span>
          </p>
          <p className={styles['value-detail-modal--value']}>
            Valor: <span>{data.value}</span>{' '}
            <button onClick={() => setIsEditMode(true)}>
              <TbEdit color="#ffc107" size={18} />
            </button>
          </p>
          {data.position && (
            <p>
              Posición: <span>{data.position}</span>
            </p>
          )}
          {data.box && (
            <p>
              Cajón: <span>{data.box}</span>
            </p>
          )}
          {data.complements && (
            <p>
              Complementos: <span>{data.complements}</span>
            </p>
          )}
          {data.corde && (
            <p>
              Cuerda: <span>{data.corde}</span>
            </p>
          )}
          {data.raceType && (
            <p>
              Tipo carrera: <span>{data.raceType}</span>
            </p>
          )}
          <p>
            Fecha: <span>{showDateFormatted()}</span>
          </p>
        </div>
      )}
    </BasicModal>
  );
};

export default ValueDetailModal;
