'use client';

import styles from './HorsesSearcherResults.module.scss';

const HorsesSearcherResults = ({ horses, openHorseData }) => (
  <table className={styles['horses-searcher-results']}>
    <thead>
      <tr>
        <th>Nombre del Caballo</th>
        <th>Edad</th>
        <th>Género</th>
        <th>Padre</th>
        <th>Madre</th>
        <th>Abuelo</th>
      </tr>
    </thead>
    <tbody>
      {horses.map((elm, index) => (
        <tr key={`horseRow-${index}`}>
          <td className={styles['horses-searcher-results--td-name']}>
            <button onClick={() => openHorseData(elm)}>{elm.name}</button>
          </td>
          <td>{new Date().getFullYear() - elm.year || ''} años</td>
          <td>{elm.genre || ''}</td>
          <td className={styles['horses-searcher-results--td-name']}>{elm.father || ''}</td>
          <td className={styles['horses-searcher-results--td-name']}>{elm.mother || ''}</td>
          <td className={styles['horses-searcher-results--td-name']}>{elm.grandFather || ''}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default HorsesSearcherResults;
