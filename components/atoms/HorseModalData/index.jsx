'use client';

import { isoDatetoddmmyyyy } from '@/lib/utils';

import styles from './HorseModalData.module.scss';

const HorseModalData = ({ horseData }) => {
  const getTerrainType = (elm) => {
    if (!elm.surface) return '';
    return elm.surface.toUpperCase() === 'PSF'
      ? 'PSF'
      : elm.measurement
      ? elm.measurement
      : elm.mud
      ? 'Barro'
      : elm.surface.toUpperCase() === 'HIERBA'
      ? 'Hierba'
      : '';
  };

  const getRaceType = (raceType) => {
    if (!raceType) return '';
    return raceType.toUpperCase().includes('INCON')
      ? ''
      : raceType.toUpperCase().includes('RECL')
      ? 'Rec'
      : raceType.toUpperCase().includes('HAND')
      ? 'Hand'
      : 'Cond';
  };

  return (
    <div className={styles['horse-modal-data']}>
      <h6>Últimas carreras:</h6>
      {horseData.values?.length > 0 && (
        <table className={styles['horse-data-table']}>
          <thead>
            <tr className={styles['horse-data-table--head-tr']}>
              <th className={styles['horse-data-table--td-name']}>Fecha</th>
              <th className={styles['horse-data-table--td-name']}>Hipódromo</th>
              <th>Dist</th>
              <th>Cuerda</th>
              <th>Terreno</th>
              <th>Tipo</th>
              <th>Pos</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {horseData.values
              ?.sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((elm) => (
                <tr key={elm._id}>
                  <td className={styles['horse-data-table--td-name']}>
                    {new Date(elm.date).getFullYear() < 2010
                      ? 'No disponible'
                      : isoDatetoddmmyyyy(elm.date)}
                  </td>
                  <td className={styles['horse-data-table--td-name']}>
                    {elm.racecourse}
                  </td>
                  <td>{elm.distance}</td>
                  <td>{elm.corde}</td>
                  <td>{getTerrainType(elm)}</td>
                  <td>{getRaceType(elm.raceType)}</td>
                  <td>{elm.position}</td>
                  <td>{elm.value}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HorseModalData;
