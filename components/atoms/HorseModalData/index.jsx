'use client';

import {
  formatName,
  getCorde,
  getRaceType,
  getTerrainType,
  isoDatetoddmmyyyy,
  setTerrainColor
} from '@/lib/utils';

import styles from './HorseModalData.module.scss';

const HorseModalData = ({ horseData }) => (
  <div className={styles['horse-modal-data']}>
    <h6>Últimas carreras:</h6>
    {horseData.values?.length > 0 && (
      <table className={styles['horse-data-table']}>
        <thead>
          <tr className={styles['horse-data-table--head-tr']}>
            <th className={styles['horse-data-table--td-name']}>Fecha</th>
            <th className={styles['horse-data-table--td-name']}>Hipódromo</th>
            <th>Dist</th>
            <th>Comp</th>
            <th>D</th>
            <th>Jockey</th>
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
                  {formatName(elm.racecourse)}
                </td>
                <td>{elm.distance}</td>
                <td>
                  {`${elm.complements} ${elm.bonnet ? 'TAP' : ''} ${
                    elm.attacheLangue ? 'L.A.' : ''
                  }`
                    .split(' ')
                    .filter(elm => elm !== '')
                    .join(' - ')}
                </td>
                <td>{getCorde(elm.corde)}</td>
                <td>{formatName(elm.jockey)}</td>
                <td
                  style={{
                    color: setTerrainColor(getTerrainType(elm)),
                    fontWeight: 'bold'
                  }}
                >
                  {getTerrainType(elm)}
                </td>
                <td>{getRaceType(elm.raceType)}</td>
                <td>{elm.position}</td>
                <td>
                  {!elm.value && !elm.position
                    ? 'Ret'
                    : !elm.value
                    ? 'sv'
                    : elm.value}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    )}
  </div>
);

export default HorseModalData;
