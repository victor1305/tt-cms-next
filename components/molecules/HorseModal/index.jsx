'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { defaultHorseRace } from '@/lib/constants';
import { configDatePicker } from '@/lib/datePickerConfig';
import { createHorseRace } from '@/lib/https';

import { BasicModal } from '@/components/atoms';

import styles from './HorseModal.module.scss';

const HorseModal = ({ handleClose, show, token, id, horseSubmitted }) => {
  const [isInvalidForm, setIsInvalidForm] = useState(false);
  const [raceData, setRaceData] = useState(defaultHorseRace);

  const closeModal = () => {
    handleClose();
  };

  const resetForm = () => {
    setRaceData(defaultHorseRace);
    setIsInvalidForm(false);
  };

  const validateForm = () => {
    const isInValid = !raceData.value.length || !raceData.surface.length;
    setIsInvalidForm(isInValid);
    return isInValid;
  };

  const saveData = async () => {
    if (validateForm()) return;
    const res = await createHorseRace({ raceData, token, id });
    horseSubmitted(res);
    resetForm();
  };

  return (
    <BasicModal {...{ show, handleClose: closeModal, hasXToClose: true }}>
      <div className={styles['horse-modal']}>
        <h4>Añadir Carrera</h4>
        <div className={styles['horse-modal__form-box']}>
          <label>Valor: *</label>
          <input
            type="text"
            name="value"
            value={raceData.value}
            onChange={(e) =>
              setRaceData({ ...raceData, value: e.target.value })
            }
          />
        </div>
        <div className={styles['horse-modal__multi-group']}>
          <div className={styles['horse-modal__form-box']}>
            <label>Superficie: *</label>
            <div>
              <input
                type="radio"
                id="surfacePSF"
                className={styles['horse-modal__form-box--pointer']}
                name="surface"
                value="PSF"
                checked={raceData.surface === 'PSF'}
                onChange={() => setRaceData({ ...raceData, surface: 'PSF' })}
              />
              <label
                className={styles['horse-modal__form-box--radio']}
                htmlFor="surfacePSF"
              >
                PSF
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="surfaceHierba"
                className={styles['horse-modal__form-box--pointer']}
                name="surface"
                value="Hierba"
                checked={raceData.surface === 'Hierba'}
                onChange={() => setRaceData({ ...raceData, surface: 'Hierba' })}
              />
              <label
                className={styles['horse-modal__form-box--radio']}
                htmlFor="surfaceHierba"
              >
                Hierba
              </label>
            </div>
          </div>
          <div className={styles['horse-modal__form-box']}>
            <label>Barro: *</label>
            <div>
              <input
                type="checkbox"
                id="mud"
                className={styles['horse-modal__form-box--pointer']}
                name="mud"
                checked={raceData.mud}
                onChange={() =>
                  setRaceData({ ...raceData, mud: !raceData.mud })
                }
              />
              <label
                className={styles['horse-modal__form-box--radio']}
                htmlFor="mudYes"
              >
                Sí
              </label>
            </div>
          </div>
          <div className={styles['horse-modal__form-box']}>
            <label>Fecha:</label>
            <DatePicker
              {...configDatePicker}
              className="date-input"
              selected={Date.parse(raceData.date)}
              onChange={(e) =>
                setRaceData({ ...raceData, date: e || new Date() })
              }
              showPopperArrow={false}
            />
          </div>
        </div>
        <div className={styles['horse-modal__form-box']}>
          <label>Hipódromo: </label>
          <input
            type="text"
            name="racecourse"
            value={raceData.racecourse}
            onChange={(e) =>
              setRaceData({ ...raceData, racecourse: e.target.value })
            }
          />
        </div>
        <div className={styles['horse-modal__form-box']}>
          <label>Distancia: </label>
          <input
            type="number"
            name="distance"
            value={raceData.distance}
            onChange={(e) =>
              setRaceData({ ...raceData, distance: e.target.value })
            }
          />
        </div>
        <div className={styles['horse-modal__form-box']}>
          <label>Tipo de carrera: </label>
          <select
            onChange={(e) =>
              setRaceData({ ...raceData, raceType: e.target.value })
            }
          >
            <option>--- Selecciona un Tipo ---</option>
            <option>Condición</option>
            <option>Handicap</option>
            <option>Reclamar</option>
          </select>
        </div>
        <div className={styles['horse-modal__form-box']}>
          <label>Jockey: </label>
          <input
            type="text"
            name="jockey"
            value={raceData.jockey}
            onChange={(e) =>
              setRaceData({ ...raceData, jockey: e.target.value })
            }
          />
        </div>
        <div className={styles['horse-modal__form-box']}>
          <label>Preparación: </label>
          <input
            type="text"
            name="trainer"
            value={raceData.trainer}
            onChange={(e) =>
              setRaceData({ ...raceData, trainer: e.target.value })
            }
          />
        </div>
        <div className={styles['horse-modal__form-box']}>
          <label>Medición pista (Penetrómetro): </label>
          <input
            type="text"
            name="measurement"
            value={raceData.measurement}
            onChange={(e) =>
              setRaceData({ ...raceData, measurement: e.target.value })
            }
          />
        </div>
        <div className={styles['horse-modal__form-box']}>
          <label>Accesorios: </label>
          <select
            onChange={(e) =>
              setRaceData({ ...raceData, complements: e.target.value })
            }
          >
            <option>--- Selecciona un Accesorio ---</option>
            <option>BR</option>
            <option>CA</option>
          </select>
        </div>
        <div className={styles['horse-modal__form-box']}>
          <label>Box: </label>
          <input
            type="number"
            name="box"
            value={raceData.box}
            onChange={(e) => setRaceData({ ...raceData, box: e.target.value })}
          />
        </div>
        <div className={styles['horse-modal__form-box']}>
          <label>Peso: </label>
          <input
            type="number"
            name="weight"
            value={raceData.weight}
            onChange={(e) =>
              setRaceData({ ...raceData, weight: e.target.value })
            }
          />
        </div>
        <div className={styles['horse-modal__form-box']}>
          <label>Peso con descargo: </label>
          <input
            type="number"
            name="unload"
            value={raceData.unload}
            onChange={(e) =>
              setRaceData({ ...raceData, unload: e.target.value })
            }
          />
        </div>
        <div className={styles['horse-modal__form-box']}>
          <label>Cuerda: </label>
          <select
            onChange={(e) =>
              setRaceData({ ...raceData, corde: e.target.value })
            }
          >
            <option>--- Selecciona la dirección ---</option>
            <option>Mano derecha</option>
            <option>Mano izquierda</option>
            <option>Linea recta</option>
          </select>
        </div>
        <div className={styles['horse-modal__form-box']}>
          <label>Posición: </label>
          <input
            type="text"
            name="position"
            value={raceData.position}
            onChange={(e) =>
              setRaceData({ ...raceData, position: e.target.value })
            }
          />
        </div>
        <div className={styles['horse-modal__form-box']}>
          <label>Anotaciones: </label>
          <input
            type="text"
            name="notes"
            value={raceData.notes}
            onChange={(e) =>
              setRaceData({ ...raceData, notes: e.target.value })
            }
          />
        </div>
        {isInvalidForm && (
          <p className={styles['horse-modal__form-error']}>
            Los campos valor, barro y superfice son obligatorios
          </p>
        )}
        <div className={styles['horse-modal__btn-box']}>
          <button className="form-btn form-btn--primary" onClick={saveData}>
            Guardar
          </button>
        </div>
      </div>
    </BasicModal>
  );
};

export default HorseModal;
