'use client';

import React, { useState, useMemo } from 'react';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';

import { HorseModal, ValueDetailModal } from '@/components/molecules';

import styles from './QuadrantTable.module.scss';

const QuadrantTable = ({ dataRaces, token }) => {
  const [data, setData] = useState(dataRaces);
  const [sortConfig, setSortConfig] = useState({
    key: 'number',
    direction: 'ascending'
  });
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

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
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

  const getMediumValue = (datos, preferredSurface) => {
    const valuesWithPreferredSurface = datos.filter(
      (val) => val.surface === preferredSurface
    );
    const valuesFiltered = valuesWithPreferredSurface.length
      ? valuesWithPreferredSurface
      : datos;
    const last5Values = valuesFiltered
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
    setHorseData({
      ...horseData,
      values: [...horseData.values, newRace].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      )
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

  const getDifferenceData = (dayRace, dayLastRace) => {
    const dayRaceFormatted = new Date(dayRace);
    const dayLastRaceFormatted = new Date(dayLastRace);

    if (dayLastRaceFormatted.getFullYear() < 2000) return '';
    const diffInMs = dayRaceFormatted - dayLastRaceFormatted;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return Math.round(diffInDays);
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
    (horse) => horse.thisRaceData.position
  );
  const showCorrectionColumn = data.horses.some(
    (horse) => horse.thisRaceData.value && horse.thisRaceData.value.length > 0
  );

  const sortedHorses = useMemo(() => {
    let sortableItems = [...data.horses];

    const getSortableValue = (horse, key) => {
      if (key === 'R.Med')
        return (
          horse.thisRaceData.weight - getMediumValue(horse.values, data.surface)
        );
      if (key === 'R.Abs')
        return (
          horse.thisRaceData.weight -
          getFirstValue(getBestValue(horse.values, data.surface)?.value)
        );
      if (key === 'R.10')
        return (
          horse.thisRaceData.weight -
          getFirstValue(
            getBestValue(horse.values.slice(-10), data.surface)?.value
          )
        );
      if (key === 'R.5')
        return (
          horse.thisRaceData.weight -
          getFirstValue(
            getBestValue(horse.values.slice(-5), data.surface)?.value
          )
        );
      if (key === 'R.Ult')
        return (
          horse.thisRaceData.weight -
          getFirstValue(horse.values[horse.values.length - 1]?.value)
        );
      if (key === 'R.Edu') return getFirstValue(horse.thisRaceData.driveRest);
    };

    if (sortConfig.key === 'position' || sortConfig.key === 'number') {
      sortableItems.sort((a, b) => {
        const aValue = a.thisRaceData[sortConfig.key] ?? a[sortConfig.key];
        const bValue = b.thisRaceData[sortConfig.key] ?? b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    if (sortConfig.key.includes('R.')) {
      sortableItems.sort((a, b) => {
        const aValue = getSortableValue(a, sortConfig.key);
        const bValue = getSortableValue(b, sortConfig.key);

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.horses, sortConfig]);

  return (
    <div className={styles['quadrant-table-container']}>
      <table className={styles['quadrant-table']}>
        <thead>
          <tr>
            <th></th>
            <th className={styles['quadrant-table--sticky-th']}>
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
            <th>{data.measurement && data.measurement}</th>
            <th>{data.measurementValue && data.measurementValue}</th>
            <th>{data.time}</th>
            <th></th>
            <th></th>
            {showPositionNotes && <th></th>}
            {showCorrectionColumn && <th></th>}
            {showPositionColumn && <th></th>}
          </tr>
          <tr>
            <th
              className={styles['quadrant-table--number']}
              onClick={() => requestSort('number')}
            >
              <p>
                Nº
                {sortConfig.key === 'number' &&
                  (sortConfig.direction === 'ascending' ? (
                    <BiSolidDownArrow />
                  ) : (
                    <BiSolidUpArrow />
                  ))}
              </p>
            </th>
            <th
              className={`${styles['quadrant-table--horse']} ${styles['quadrant-table--sticky-th']}`}
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
            <th
              className={styles['quadrant-table--rest']}
              onClick={() => requestSort('R.Med')}
            >
              <p>
                R.Med
                {sortConfig.key === 'R.Med' &&
                  (sortConfig.direction === 'ascending' ? (
                    <BiSolidDownArrow />
                  ) : (
                    <BiSolidUpArrow />
                  ))}
              </p>
            </th>
            <th
              className={styles['quadrant-table--rest']}
              onClick={() => requestSort('R.Abs')}
            >
              <p>
                R.Abs
                {sortConfig.key === 'R.Abs' &&
                  (sortConfig.direction === 'ascending' ? (
                    <BiSolidDownArrow />
                  ) : (
                    <BiSolidUpArrow />
                  ))}
              </p>
            </th>
            <th
              className={styles['quadrant-table--rest']}
              onClick={() => requestSort('R.10')}
            >
              <p>
                R.10
                {sortConfig.key === 'R.10' &&
                  (sortConfig.direction === 'ascending' ? (
                    <BiSolidDownArrow />
                  ) : (
                    <BiSolidUpArrow />
                  ))}
              </p>
            </th>
            <th
              className={styles['quadrant-table--rest']}
              onClick={() => requestSort('R.5')}
            >
              <p>
                R.5
                {sortConfig.key === 'R.5' &&
                  (sortConfig.direction === 'ascending' ? (
                    <BiSolidDownArrow />
                  ) : (
                    <BiSolidUpArrow />
                  ))}
              </p>
            </th>
            <th
              className={styles['quadrant-table--rest']}
              onClick={() => requestSort('R.Ult')}
            >
              <p>
                R.Ult
                {sortConfig.key === 'R.Ult' &&
                  (sortConfig.direction === 'ascending' ? (
                    <BiSolidDownArrow />
                  ) : (
                    <BiSolidUpArrow />
                  ))}
              </p>
            </th>
            <th
              className={styles['quadrant-table--rest']}
              onClick={() => requestSort('R.Edu')}
            >
              <p>
                R.Edu
                {sortConfig.key === 'R.Edu' &&
                  (sortConfig.direction === 'ascending' ? (
                    <BiSolidDownArrow />
                  ) : (
                    <BiSolidUpArrow />
                  ))}
              </p>
            </th>
            <th>S/C</th>
            {showPositionNotes && <th>Anotaciones</th>}
            {showCorrectionColumn && <th>Corrección</th>}
            {showPositionColumn && (
              <th
                className={styles['quadrant-table--rest']}
                onClick={() => requestSort('position')}
              >
                <p>
                  Pos
                  {sortConfig.key === 'position' &&
                    (sortConfig.direction === 'ascending' ? (
                      <BiSolidDownArrow />
                    ) : (
                      <BiSolidUpArrow />
                    ))}
                </p>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {sortedHorses.map((elm, index) => (
            <tr key={`${elm.name}-${index}`}>
              <td>{elm.thisRaceData.number}</td>
              <td
                onClick={() => openCreateRace(elm)}
                className={`pointer ${styles['quadrant-table--td-name']} ${styles['quadrant-table--sticky-td']}`}
              >
                {formatName(elm.name)}
                {elm.thisRaceData.supplement && (
                  <span className={styles['quadrant-table--suppl']}>Suppl</span>
                )}
              </td>
              <td>
                {`${elm.thisRaceData.complements} ${
                  elm.thisRaceData.bonnet ? 'TAP' : ''
                } ${elm.thisRaceData.attacheLangue ? 'L.A.' : ''}`
                  .split(' ')
                  .filter(elm => elm !== '')
                  .join(' - ')}
              </td>
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
                  : elm.values
                      .sort((a, b) => new Date(a.date) - new Date(b.date))
                      .slice(-6)
                      .map((race, index) => (
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
                            {race.value
                              ? race.value
                              : !race.value && !race.position
                              ? 'Ret'
                              : 'sv'}
                          </span>
                          {index < elm.values.slice(-6).length - 1 ? (
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
                      elm.thisRaceData.weight -
                      getMediumValue(elm.values, data.surface)
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
                        getBestValue(elm.values.slice(-10), data.surface) || {}
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
                        (getBestValue(elm.values.slice(-5), data.surface) || {})
                          .surface === 'PSF'
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
              <td
                style={{
                  fontWeight: elm.thisRaceData.isBoldDrive ? '900' : '400'
                }}
              >
                {elm.thisRaceData.driveRest?.toLowerCase().includes('deb')
                  ? 'Deb'
                  : elm.thisRaceData.driveRest || ''}
              </td>
              <td>
                {elm.values.length
                  ? getDifferenceData(
                      elm.thisRaceData.date,
                      elm.values[elm.values.length - 1].date
                    )
                  : ''}
              </td>
              {showPositionNotes && <td>{elm.thisRaceData.notes}</td>}
              {showCorrectionColumn && <td>{elm.thisRaceData.value}</td>}
              {showPositionColumn && <td>{elm.thisRaceData.position}</td>}
            </tr>
          ))}
        </tbody>
      </table>

      {valueDetailData && (
        <ValueDetailModal
          handleClose={() => setValueDetailModalOppened(false)}
          {...{
            token,
            show: valueDetailModalOppened,
            data: valueDetailData,
            formSubmitted
          }}
        />
      )}

      {horseData.name && (
        <HorseModal
          handleClose={() => setNewRaceModalOppened(false)}
          {...{
            token,
            show: newRaceModalOppened,
            id: horseData._id,
            horseSubmitted,
            horseData
          }}
        />
      )}
    </div>
  );
};

export default QuadrantTable;
