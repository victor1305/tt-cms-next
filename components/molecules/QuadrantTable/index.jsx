'use client';

import React, { useState } from 'react';

import { HorseModal, ValueDetailModal } from '@/components/molecules';

import styles from './QuadrantTable.module.scss';

const QuadrantTable = ({ dataRaces, token }) => {
  const [data, setData] = useState(dataRaces);
  const [valueDetailModalOppened, setValueDetailModalOppened] = useState(false);
  const [valueDetailData, setValueDetailData] = useState({});
  const [horseData, setHorseData] = useState({});
  const [newRaceModalOppened, setNewRaceModalOppened] = useState(false);

  const setValues = (horseData) => {
    if (horseData.thisRaceData.debut) {
      return 'Debutante';
    }
    return '';
  };

  const getTwoValues = (value) => {
    const withoutParenthesis = value.replace(/\([^)]+\)/g, '');
    const numbers = withoutParenthesis.match(/[\d,.]+/g);

    if (numbers) {
      if (
        (withoutParenthesis.includes('am') ||
          withoutParenthesis.includes('ap')) &&
        numbers.length > 1
      ) {
        return [
          parseFloat(numbers[0].replace(/,(\d{1,2})$/, '.$1')),
          parseFloat(numbers[1].replace(/,(\d{1,2})$/, '.$1')),
          withoutParenthesis.includes('am') ? 'am' : 'ap'
        ];
      } else {
        return [parseFloat(numbers[0].replace(/,(\d{1,2})$/, '.$1'))];
      }
    }

    return 0;
  };

  const getFirstValue = (value) => {
    if (value) {
      const sinParentesis = value.replace(/\([^)]+\)/g, '');
      const numeros = sinParentesis.match(/[\d,.]+/g);

      if (numeros) {
        let numeroRelevanteStr = numeros[0];
        const numeroRelevante = parseFloat(
          numeroRelevanteStr.replace(/,(\d{1,2})$/, '.$1')
        );

        return numeroRelevante;
      }
      return 0;
    }
    return 0;
  };

  const getMediumValue = (datos) => {
    const last5Values = datos
      .slice(-5)
      .map((obj) => getFirstValue(obj.value))
      .filter((val) => val !== null);

    last5Values.sort((a, b) => a - b);

    let mediana;
    const half = Math.floor(last5Values.length / 2);

    if (last5Values.length % 2 === 0) {
      mediana = (last5Values[half - 1] + last5Values[half]) / 2;
    } else {
      mediana = last5Values[half];
    }
    return mediana;
  };

  const formSubmitted = (newValue, id) => {
    const newData = { ...data };
    newData.horses = newData.horses.map((horse) => ({
      ...horse,
      values: horse.values.map((race) =>
        race._id === id ? { ...race, value: newValue } : race
      )
    }));
    setData(newData);
  };

  const horseSubmitted = (newRace) => {
    setNewRaceModalOppened(false);
    const updatedHorses = data.horses.map((horse) => {
      if (horse._id === horseData._id) {
        const updatedValues = [...horse.values, newRace];
        return {
          ...horse,
          values: updatedValues.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          )
        };
      }
      return horse;
    });

    setData({
      ...data,
      horses: updatedHorses
    });
  };

  const formatName = (name) =>
    name
      .toLowerCase()
      .replace(/(^\w)|([-\s]\w)/g, (match) => match.toUpperCase())
      .replace(/(^|\. *)([a-z])/g, (match) => match.toUpperCase());

  const getBestValue = (values, preferredSurface) => {
    const matchingSurfaceValues = values.filter(
      (val) => val.surface === preferredSurface
    );

    const relevantValues =
      matchingSurfaceValues.length > 0 ? matchingSurfaceValues : values;

    return relevantValues.reduce((max, obj) => {
      const actualValue = getFirstValue(obj.value);
      const maxValue = max ? getFirstValue(max.value) : 0;

      return actualValue > maxValue ? obj : max;
    }, null);
  };

  const calculateRest = (value, weight, unload) => {
    if (value && value.value) {
      const values = getTwoValues(value.value);

      if (values.length === 1) return weight - values[0];
      if (values.length === 3) {
        return unload === 0
          ? `${weight - values[0]}${values[2]}${weight - values[1]}`
          : `${weight - values[0]}c`;
      }
    }
    return 0;
  };

  const openValueDetail = (value) => {
    setValueDetailData(value);
    setValueDetailModalOppened(true);
  };

  const openCreateRace = (horse) => {
    setHorseData(horse);
    setNewRaceModalOppened(true);
  };

  const showPositionNotes = data.horses.some(
    (horse) => horse.thisRaceData.notes && horse.thisRaceData.notes.length > 0
  );
  const showPositionColumn = data.horses.some(
    (horse) =>
      horse.thisRaceData.position && horse.thisRaceData.position.length > 0
  );
  const showCorrectionColumn = data.horses.some(
    (horse) => horse.thisRaceData.value && horse.thisRaceData.value.length > 0
  );

  return (
    <div className={styles['quadrant-table-container']}>
      <table className={styles['quadrant-table']}>
        <thead>
          <tr>
            <th></th>
            <th className={styles['quadrant-table--sticky']}>
              {data.racecourse}
            </th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>Carrera {data.number}</th>
            <th>{data.raceType}</th>
            <th>{data.distance}</th>
            <th
              className={
                data.surface === 'PSF'
                  ? styles['quadrant-table--psf']
                  : styles['quadrant-table--grass']
              }
            >
              {data.surface}
            </th>
            <th></th>
            <th></th>
            <th>{data.time}</th>
            <th></th>
            {showPositionNotes && <th></th>}
            {showCorrectionColumn && <th></th>}
            {showPositionColumn && <th></th>}
          </tr>
          <tr>
            <th className={styles['quadrant-table--number']}>Nº</th>
            <th
              className={`${styles['quadrant-table--horse']} ${styles['quadrant-table--sticky']}`}
            >
              Caballo
            </th>
            <th className={styles['quadrant-table--e']}>E</th>
            <th className={styles['quadrant-table--e']}>Box</th>
            <th className={styles['quadrant-table--e']}>Edad</th>
            <th className={styles['quadrant-table--e']}>Peso</th>
            <th className={styles['quadrant-table--e']}>Desc</th>
            <th className={styles['quadrant-table--jockey']}>Jockey</th>
            <th className={styles['quadrant-table--values']}>Valores</th>
            <th className={styles['quadrant-table--rest']}>R.Med</th>
            <th className={styles['quadrant-table--rest']}>R.Abs</th>
            <th className={styles['quadrant-table--rest']}>R.10</th>
            <th className={styles['quadrant-table--rest']}>R.5</th>
            <th className={styles['quadrant-table--rest']}>R.Ult</th>
            <th className={styles['quadrant-table--rest']}>R.Edu</th>
            {showPositionNotes && <th>Anotaciones</th>}
            {showCorrectionColumn && <th>Corrección</th>}
            {showPositionColumn && <th>Posición</th>}
          </tr>
        </thead>
        <tbody>
          {data.horses
            .sort((a, b) => a.thisRaceData.number - b.thisRaceData.number)
            .map((elm, index) => (
              <tr key={`${elm.name}-${index}`}>
                <td>{elm.thisRaceData.number}</td>
                <td
                  onClick={() => openCreateRace(elm)}
                  className={`pointer ${styles['quadrant-table--td-name']} ${styles['quadrant-table--sticky']}`}
                >
                  {formatName(elm.name)}
                  {elm.thisRaceData.supplement && (
                    <span className={styles['quadrant-table--suppl']}>
                      Suppl
                    </span>
                  )}
                </td>
                <td>{elm.thisRaceData.complements}</td>
                <td>{elm.thisRaceData.box}</td>
                <td>{new Date().getFullYear() - elm.year}</td>
                <td>{elm.thisRaceData.weight}</td>
                <td>
                  {elm.thisRaceData.unload > 0 ? elm.thisRaceData.unload : ''}
                </td>
                <td className={styles['quadrant-table--td-name']}>
                  {formatName(elm.thisRaceData.jockey)}
                </td>
                <td>
                  {!elm.values.length
                    ? setValues(elm)
                    : elm.values.slice(-10).map((race, index) => (
                        <React.Fragment key={race._id}>
                          <span
                            onClick={() => openValueDetail(race)}
                            key={race._id}
                            id={race._id}
                            style={{
                              color:
                                race.surface === 'PSF' ? '#ff9900' : '#34a853',
                              textDecoration: race.mud ? 'underline' : 'none',
                              fontSize: '11px',
                              cursor: 'pointer'
                            }}
                          >
                            {race.value}
                          </span>
                          {index < elm.values.slice(-10).length - 1 ? (
                            <span style={{ color: '#fff' }}> - </span>
                          ) : (
                            ''
                          )}
                        </React.Fragment>
                      ))}
                </td>
                <td>
                  {!elm.values.length ? (
                    ''
                  ) : (
                    <span>
                      {(
                        elm.thisRaceData.weight - getMediumValue(elm.values)
                      ).toFixed(1)}
                    </span>
                  )}
                </td>
                <td>
                  {!elm.values.length ? (
                    ''
                  ) : (
                    <span
                      onClick={() =>
                        openValueDetail(getBestValue(elm.values, data.surface))
                      }
                      style={{
                        color:
                          (getBestValue(elm.values, data.surface) || {})
                            .surface === 'PSF'
                            ? '#ff9900'
                            : '#34a853',
                        textDecoration: (
                          getBestValue(elm.values, data.surface) || {}
                        ).mud
                          ? 'underline'
                          : 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {calculateRest(
                        getBestValue(elm.values, data.surface) || {}.value,
                        elm.thisRaceData.weight,
                        elm.thisRaceData.unload
                      )}
                    </span>
                  )}
                </td>
                <td>
                  {!elm.values.length ? (
                    ''
                  ) : (
                    <span
                      onClick={() =>
                        openValueDetail(
                          getBestValue(elm.values.slice(-10), data.surface)
                        )
                      }
                      style={{
                        color:
                          (
                            getBestValue(elm.values.slice(-10), data.surface) ||
                            {}
                          ).surface === 'PSF'
                            ? '#ff9900'
                            : '#34a853',
                        textDecoration: (
                          getBestValue(elm.values.slice(-10), data.surface) ||
                          {}
                        ).mud
                          ? 'underline'
                          : 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {calculateRest(
                        getBestValue(elm.values.slice(-10), data.surface) ||
                          {}.value,
                        elm.thisRaceData.weight,
                        elm.thisRaceData.unload
                      )}
                    </span>
                  )}
                </td>
                <td>
                  {!elm.values.length ? (
                    ''
                  ) : (
                    <span
                      onClick={() =>
                        openValueDetail(
                          getBestValue(elm.values.slice(-5), data.surface)
                        )
                      }
                      style={{
                        color:
                          (
                            getBestValue(elm.values.slice(-5), data.surface) ||
                            {}
                          ).surface === 'PSF'
                            ? '#ff9900'
                            : '#34a853',
                        textDecoration: (
                          getBestValue(elm.values.slice(-5), data.surface) || {}
                        ).mud
                          ? 'underline'
                          : 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {calculateRest(
                        getBestValue(elm.values.slice(-5), data.surface) ||
                          {}.value,
                        elm.thisRaceData.weight,
                        elm.thisRaceData.unload
                      )}
                    </span>
                  )}
                </td>
                <td>
                  {!elm.values.length ? (
                    ''
                  ) : (
                    <span
                      onClick={() =>
                        openValueDetail(elm.values[elm.values.length - 1])
                      }
                      style={{
                        color:
                          elm.values[elm.values.length - 1].surface === 'PSF'
                            ? '#ff9900'
                            : '#34a853',
                        textDecoration: elm.values[elm.values.length - 1].mud
                          ? 'underline'
                          : 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {calculateRest(
                        elm.values[elm.values.length - 1],
                        elm.thisRaceData.weight,
                        elm.thisRaceData.unload
                      )}
                    </span>
                  )}
                </td>
                <td>{elm.thisRaceData.driveRest || ''}</td>
                {showPositionNotes && <td>{elm.thisRaceData.notes}</td>}
                {showCorrectionColumn && <td>{elm.thisRaceData.value}</td>}
                {showPositionColumn && <td>{elm.thisRaceData.position}</td>}
              </tr>
            ))}
        </tbody>
      </table>

      <ValueDetailModal
        handleClose={() => setValueDetailModalOppened(false)}
        {...{
          token,
          show: valueDetailModalOppened,
          data: valueDetailData,
          formSubmitted
        }}
      />

      <HorseModal
        handleClose={() => setNewRaceModalOppened(false)}
        {...{
          token,
          show: newRaceModalOppened,
          id: horseData._id,
          horseSubmitted
        }}
      />
    </div>
  );
};

export default QuadrantTable;
