'use client';

import { isoDatetoddmmyyyy } from '@/lib/utils';

import styles from './HorseModalData.module.scss';

const HorseModalData = ({ horseData }) => {
  const getTerrainType = (elm) =>
    elm.surface.toUpperCase() === 'PSF' ? 'PSF' : elm.measurement;

  const getRaceType = (raceType) =>
    raceType.toUpperCase().includes('INCON')
      ? ''
      : raceType.toUpperCase().includes('RECL')
      ? 'Rec'
      : raceType.toUpperCase().includes('HAND')
      ? 'Hand'
      : 'Cond';

  const getRaceDataValues = (parameter, race) => {
    const horseVal = horseData.values.find((elm) => elm.date === race.date);
    return horseVal ? horseVal[parameter] : '';
  };

  return (
    <div className={styles['horse-modal-data']}>
      <h6>Últimas carreras:</h6>
      {horseData.races?.length > 0 && (
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
            {horseData.races?.map((elm) => (
              <tr key={elm._id}>
                <td className={styles['horse-data-table--td-name']}>
                  {isoDatetoddmmyyyy(elm.date)}
                </td>
                <td className={styles['horse-data-table--td-name']}>
                  {elm.racecourse}
                </td>
                <td>{elm.distance}</td>
                <td>{elm.corde}</td>
                <td>{getTerrainType(elm)}</td>
                <td>{getRaceType(elm.raceType)}</td>
                <td>{getRaceDataValues('position', elm)}</td>
                <td>{getRaceDataValues('value', elm)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HorseModalData;
