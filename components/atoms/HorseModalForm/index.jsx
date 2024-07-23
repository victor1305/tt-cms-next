'use client';

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { configDatePicker } from '@/lib/datePickerConfig';

import styles from './HorseModalForm.module.scss';

const HorseModalForm = ({ raceData, setRaceData, isInvalidForm, saveData }) => (
  <div>
    <h6>Añadir Carrera</h6>
    <div className={styles['horse-modal-form__multi-group']}>
      <div className={styles['horse-modal-form__form-box']}>
        <label>Valor: *</label>
        <input
          type="text"
          name="value"
          value={raceData.value}
          onChange={(e) => setRaceData({ ...raceData, value: e.target.value })}
        />
      </div>
      <div className={styles['horse-modal-form__form-box']}>
        <label>Superficie: *</label>
        <select
          onChange={(e) =>
            setRaceData({ ...raceData, surface: e.target.value })
          }
        >
          <option value={''}>--- Selecciona una Superfice ---</option>
          <option>PSF</option>
          <option>Hierba</option>
        </select>
      </div>
      <div className={styles['horse-modal-form__form-box']}>
        <label>Barro: *</label>
        <select
          onChange={(e) => setRaceData({ ...raceData, mud: e.target.value })}
        >
          <option value={false}>No</option>
          <option value={true}>Sí</option>
        </select>
      </div>
      <div className={styles['horse-modal-form__form-box']}>
        <label>Fecha: *</label>
        <DatePicker
          {...configDatePicker}
          className="date-input"
          selected={Date.parse(raceData.date)}
          onChange={(e) => setRaceData({ ...raceData, date: e || new Date() })}
          showPopperArrow={false}
        />
      </div>
    </div>
    <div className={styles['horse-modal-form__form-box']}>
      <label>Hipódromo: *</label>
      <input
        type="text"
        name="racecourse"
        value={raceData.racecourse}
        onChange={(e) =>
          setRaceData({ ...raceData, racecourse: e.target.value })
        }
      />
    </div>
    <div className={styles['horse-modal-form__multi-group']}>
      <div className={styles['horse-modal-form__form-box']}>
        <label>Dirección: </label>
        <select
          onChange={(e) => setRaceData({ ...raceData, corde: e.target.value })}
        >
          <option value={''}>--- Selecciona la dirección ---</option>
          <option>Mano derecha</option>
          <option>Mano izquierda</option>
          <option>Linea recta</option>
        </select>
      </div>
      <div className={styles['horse-modal-form__form-box']}>
        <label>Medición pista (Penetrómetro): </label>
        <select
          onChange={(e) =>
            setRaceData({ ...raceData, measurement: e.target.value })
          }
        >
          <option value={''}>--- Selecciona la medición ---</option>
          <option>Leger</option>
          <option>Bon leger</option>
          <option>Bon</option>
          <option>Bon souple</option>
          <option>Souple</option>
          <option>Tres souple</option>
          <option>Collant</option>
          <option>Lourd</option>
          <option>Tres lourd</option>
        </select>
      </div>
      <div className={styles['horse-modal-form__form-box']}>
        <label>Distancia: *</label>
        <input
          type="number"
          name="distance"
          value={raceData.distance}
          onChange={(e) =>
            setRaceData({ ...raceData, distance: e.target.value })
          }
        />
      </div>
    </div>
    <div className={styles['horse-modal-form__form-box']}>
      <label>Tipo de carrera: </label>
      <select
        onChange={(e) => setRaceData({ ...raceData, raceType: e.target.value })}
      >
        <option value={''}>--- Selecciona un Tipo ---</option>
        <option>Condición</option>
        <option>Handicap</option>
        <option>Reclamar</option>
      </select>
    </div>
    <div className={styles['horse-modal-form__form-box']}>
      <label>Jockey: </label>
      <input
        type="text"
        name="jockey"
        value={raceData.jockey}
        onChange={(e) => setRaceData({ ...raceData, jockey: e.target.value })}
      />
    </div>
    <div className={styles['horse-modal-form__form-box']}>
      <label>Preparación: </label>
      <input
        type="text"
        name="trainer"
        value={raceData.trainer}
        onChange={(e) => setRaceData({ ...raceData, trainer: e.target.value })}
      />
    </div>
    <div className={styles['horse-modal-form__multi-group']}>
      <div className={styles['horse-modal-form__form-box']}>
        <label>Accesorios: </label>
        <select
          onChange={(e) =>
            setRaceData({ ...raceData, complements: e.target.value })
          }
        >
          <option value={''}>--- Selecciona un Accesorio ---</option>
          <option>BR</option>
          <option>CA</option>
        </select>
      </div>
      <div className={styles['horse-modal-form__form-box']}>
        <label>Tapones: </label>
        <select
          onChange={(e) => setRaceData({ ...raceData, bonnet: e.target.value })}
        >
          <option value={false}>No</option>
          <option value={true}>Sí</option>
        </select>
      </div>
      <div className={styles['horse-modal-form__form-box']}>
        <label>Lengua atada: </label>
        <select
          onChange={(e) =>
            setRaceData({ ...raceData, attacheLangue: e.target.value })
          }
        >
          <option value={false}>No</option>
          <option value={true}>Sí</option>
        </select>
      </div>
      <div className={styles['horse-modal-form__form-box']}>
        <label>Box: </label>
        <input
          type="number"
          name="box"
          value={raceData.box}
          onChange={(e) => setRaceData({ ...raceData, box: e.target.value })}
        />
      </div>
    </div>
    <div className={styles['horse-modal-form__form-box']}>
      <label>Posición: </label>
      <input
        type="text"
        name="position"
        value={raceData.position}
        onChange={(e) => setRaceData({ ...raceData, position: e.target.value })}
      />
    </div>
    <div className={styles['horse-modal-form__form-box']}>
      <label>Anotaciones: </label>
      <input
        type="text"
        name="notes"
        value={raceData.notes}
        onChange={(e) => setRaceData({ ...raceData, notes: e.target.value })}
      />
    </div>
    {isInvalidForm && (
      <p className={styles['horse-modal-form__form-error']}>
        Los campos valor, barro y superfice son obligatorios
      </p>
    )}
    <div className={styles['horse-modal-form__btn-box']}>
      <button className="form-btn form-btn--primary" onClick={saveData}>
        Guardar
      </button>
    </div>
  </div>
);

export default HorseModalForm;
