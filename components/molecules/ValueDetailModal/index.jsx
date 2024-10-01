'use client';

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { TbEdit } from 'react-icons/tb';
import 'react-datepicker/dist/react-datepicker.css';

import { configDatePicker } from '@/lib/datePickerConfig';
import { editValue, removeValue } from '@/lib/https';
import { isoDatetoddmmyyyy } from '@/lib/utils';

import { BasicModal } from '@/components/atoms';

import styles from './ValueDetailModal.module.scss';

const ValueDetailModal = ({
  data,
  handleClose,
  show,
  token,
  formSubmitted,
  removeValueFromData
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [horseData, setHorseData] = useState(data);
  const [field, setField] = useState(null);

  const dataFields = {
    value: 'valor',
    distance: 'distancia',
    racecourse: 'hipódromo',
    jockey: 'jockey',
    trainer: 'preparación',
    mud: 'barro',
    measurement: 'medición',
    surface: 'superficie',
    box: 'cajón',
    position: 'posición final',
    complements: 'complementos',
    corde: 'cuerda',
    raceType: 'tipo de carrera',
    date: 'fecha'
  };

  const closeModal = () => {
    setIsEditMode(false);
    setField(null);
    setHorseData({});
    handleClose();
  };

  const showDateFormatted = () => {
    const date = new Date(horseData.date);
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
    const res = await editValue({
      value: horseData[field],
      field,
      token,
      id: horseData._id
    });
    formSubmitted(horseData, res._id);
    closeModal();
  };

  const removeRace = async () => {
    await removeValue({
      horseId: horseData.horse,
      token,
      valueId: horseData._id
    });
    removeValueFromData(horseData._id);
    closeModal();
    setIsDelete(false);
  };

  useEffect(() => {
    setHorseData(data);
  }, [data]);

  return (
    <BasicModal {...{ show, handleClose: closeModal, hasXToClose: true }}>
      {isEditMode ? (
        <div className={styles['value-detail-modal']}>
          <h4 className={styles['value-detail-modal--h4-edit']}>Editar {dataFields[field]}</h4>
          <div className={styles['value-detail-modal__form-box']}>
            {(field === 'value' ||
              field === 'racecourse' ||
              field === 'jockey' ||
              field === 'trainer') && (
              <>
                <label>{dataFields[field]}: *</label>
                <input
                  type="text"
                  name={dataFields[field]}
                  value={horseData[field]}
                  onChange={(e) =>
                    setHorseData({ ...horseData, [field]: e.target.value })
                  }
                />
              </>
            )}
            {(field === 'distance' ||
              field === 'box' ||
              field === 'position') && (
              <>
                <label>{dataFields[field]}: *</label>
                <input
                  type="number"
                  name={dataFields[field]}
                  value={horseData[field]}
                  onChange={(e) =>
                    setHorseData({ ...horseData, [field]: e.target.value })
                  }
                />
              </>
            )}
            {field === 'mud' && (
              <select
                onChange={(e) =>
                  setHorseData({ ...horseData, mud: e.target.value })
                }
              >
                <option value={false}>No</option>
                <option value={true}>Sí</option>
              </select>
            )}
            {field === 'surface' && (
              <select
                onChange={(e) =>
                  setHorseData({ ...horseData, surface: e.target.value })
                }
              >
                <option>PSF</option>
                <option>Hierba</option>
              </select>
            )}
            {field === 'measurement' && (
              <select
                onChange={(e) =>
                  setHorseData({ ...horseData, measurement: e.target.value })
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
            )}
            {field === 'raceType' && (
              <select
                onChange={(e) =>
                  setHorseData({ ...horseData, raceType: e.target.value })
                }
              >
                <option value={''}>--- Selecciona un Tipo ---</option>
                <option>Condición</option>
                <option>Handicap</option>
                <option>Reclamar</option>
              </select>
            )}
            {field === 'corde' && (
              <select
                onChange={(e) =>
                  setHorseData({ ...horseData, corde: e.target.value })
                }
              >
                <option value={''}>--- Selecciona una Dirección ---</option>
                <option>Mano derecha</option>
                <option>Mano izquierda</option>
                <option>Linea recta</option>
              </select>
            )}
            {field === 'complements' && (
              <select
                onChange={(e) =>
                  setHorseData({ ...horseData, complements: e.target.value })
                }
              >
                <option value={''}>--- Selecciona un Accesorio ---</option>
                <option>BR</option>
                <option>CA</option>
              </select>
            )}
            {field === 'date' && (
              <DatePicker
                {...configDatePicker}
                className="date-input"
                selected={Date.parse(horseData.date)}
                onChange={(e) =>
                  setHorseData({ ...horseData, date: e || new Date() })
                }
                showPopperArrow={false}
              />
            )}
          </div>
          <div className={styles['value-detail-modal__btn-box']}>
            <button className="form-btn form-btn--primary" onClick={saveData}>
              Guardar
            </button>
          </div>
        </div>
      ) : (
        <div className={styles['value-detail-modal']}>
          <div className={styles['value-detail-modal--title']}>
            <h4>Detalle de valor</h4>
            <button
              onClick={() => setIsDelete(!isDelete)}
              className={`form-btn ${
                isDelete ? 'form-btn--primary' : 'form-btn--danger'
              }`}
            >
              {isDelete ? 'Ver detalle' : 'Eliminar valor'}
            </button>
          </div>
          {isDelete ? (
            <div className={styles['value-detail-modal--remove-section']}>
              <h6>
                ¿Quieres borrar la carrera del {isoDatetoddmmyyyy(horseData.date)} con
                valor: {data.value}?
              </h6>
              <div>
              <button
                className="form-btn form-btn--danger"
                onClick={removeRace}
              >
                Borrar
              </button>
              </div>
            </div>
          ) : (
            <>
              <p>
                Hipodrómo: <span>{data.racecourse}</span>{' '}
                <button
                  onClick={() => {
                    setField('racecourse');
                    setIsEditMode(true);
                  }}
                >
                  <TbEdit color="#ffc107" size={18} />
                </button>
              </p>
              <p>
                Distancia: <span>{data.distance}</span>{' '}
                <button
                  onClick={() => {
                    setField('distance');
                    setIsEditMode(true);
                  }}
                >
                  <TbEdit color="#ffc107" size={18} />
                </button>
              </p>
              <p>
                Jockey: <span>{data.jockey}</span>{' '}
                <button
                  onClick={() => {
                    setField('jockey');
                    setIsEditMode(true);
                  }}
                >
                  <TbEdit color="#ffc107" size={18} />
                </button>
              </p>
              <p>
                Preparación: <span>{data.trainer}</span>{' '}
                <button
                  onClick={() => {
                    setField('trainer');
                    setIsEditMode(true);
                  }}
                >
                  <TbEdit color="#ffc107" size={18} />
                </button>
              </p>
              <p>
                Barro / Pista lenta: <span>{data.mud ? 'Sí' : 'No'}</span>{' '}
                <button
                  onClick={() => {
                    setField('mud');
                    setIsEditMode(true);
                  }}
                >
                  <TbEdit color="#ffc107" size={18} />
                </button>
              </p>
              <p>
                Medición: <span>{data.measurement}</span>{' '}
                <button
                  onClick={() => {
                    setField('measurement');
                    setIsEditMode(true);
                  }}
                >
                  <TbEdit color="#ffc107" size={18} />
                </button>
              </p>
              <p>
                Superficie: <span>{data.surface}</span>{' '}
                <button
                  onClick={() => {
                    setField('surface');
                    setIsEditMode(true);
                  }}
                >
                  <TbEdit color="#ffc107" size={18} />
                </button>
              </p>
              <p className={styles['value-detail-modal--value']}>
                Valor: <span>{data.value}</span>{' '}
                <button
                  onClick={() => {
                    setField('value');
                    setIsEditMode(true);
                  }}
                >
                  <TbEdit color="#ffc107" size={18} />
                </button>
              </p>
              <p>
                Posición: <span>{data.position}</span>{' '}
                <button
                  onClick={() => {
                    setField('position');
                    setIsEditMode(true);
                  }}
                >
                  <TbEdit color="#ffc107" size={18} />
                </button>
              </p>
              <p>
                Cajón: <span>{data.box}</span>{' '}
                <button
                  onClick={() => {
                    setField('box');
                    setIsEditMode(true);
                  }}
                >
                  <TbEdit color="#ffc107" size={18} />
                </button>
              </p>
              <p>
                Complementos: <span>{data.complements}</span>{' '}
                <button
                  onClick={() => {
                    setField('complements');
                    setIsEditMode(true);
                  }}
                >
                  <TbEdit color="#ffc107" size={18} />
                </button>
              </p>
              <p>
                Cuerda: <span>{data.corde}</span>{' '}
                <button
                  onClick={() => {
                    setField('corde');
                    setIsEditMode(true);
                  }}
                >
                  <TbEdit color="#ffc107" size={18} />
                </button>
              </p>
              <p>
                Tipo carrera: <span>{data.raceType}</span>{' '}
                <button
                  onClick={() => {
                    setField('raceType');
                    setIsEditMode(true);
                  }}
                >
                  <TbEdit color="#ffc107" size={18} />
                </button>
              </p>
              <p>
                Fecha: <span>{showDateFormatted()}</span>{' '}
                <button
                  onClick={() => {
                    setField('date');
                    setIsEditMode(true);
                  }}
                >
                  <TbEdit color="#ffc107" size={18} />
                </button>
              </p>
            </>
          )}
        </div>
      )}
    </BasicModal>
  );
};

export default ValueDetailModal;
