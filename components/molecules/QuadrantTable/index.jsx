import React from 'react';

import styles from './QuadrantTable.module.scss';

const QuadrantTable = ({ data }) => {
  const setValues = (horseData) => {
    if (horseData.thisRaceData.debut) {
      return 'Debutante';
    }
    return '';
  };

  const getFirstValue = (value) => {
    // Primero eliminamos los números entre paréntesis para evitar confusiones
    if (value) {
      const sinParentesis = value.replace(/\([^)]+\)/g, '');

      // Encuentra todos los fragmentos numéricos, asumiendo que la coma puede usarse como separador decimal
      const numeros = sinParentesis.match(/[\d,.]+/g);

      if (numeros) {
        let numeroRelevanteStr = numeros[0];

        // // Verificamos la presencia de 'am' o 'ap' para decidir qué número tomar
        // if (sinParentesis.includes('am') || sinParentesis.includes('ap')) {
        //   // Si hay 'am' o 'ap', se intenta tomar el segundo número si existe
        //   numeroRelevanteStr = numeros.length > 1 ? numeros[0] : numeros[0];
        // } else {
        //   // De lo contrario, tomamos el primer número
        //   numeroRelevanteStr = numeros[0];
        // }

        // Reemplazamos la coma por el punto solo si parece ser un separador decimal
        const numeroRelevante = parseFloat(
          numeroRelevanteStr.replace(/,(\d{1,2})$/, '.$1')
        );

        // Convertimos el número relevante a entero si es necesario
        return numeroRelevante;
      }
      return 0;
    }
    return 0;
  };

  const getMediumValue = (datos) => {
    const ultimosCincoValores = datos
      .slice(-5) // Toma los últimos 5 elementos.
      .map((obj) => getFirstValue(obj.value)) // Extrae y convierte los valores relevantes.
      .filter((val) => val !== null); // Filtra los valores no válidos o no encontrados.

    // Calcula la mediana de esos valores.
    ultimosCincoValores.sort((a, b) => a - b); // Ordena los valores numéricos.

    let mediana;
    const mitad = Math.floor(ultimosCincoValores.length / 2);

    if (ultimosCincoValores.length % 2 === 0) {
      // Si hay un número par de elementos, la mediana es el promedio de los dos del medio.
      mediana =
        (ultimosCincoValores[mitad - 1] + ultimosCincoValores[mitad]) / 2;
    } else {
      // Si hay un número impar de elementos, la mediana es el elemento del medio.
      mediana = ultimosCincoValores[mitad];
    }
    return mediana;
  };

  const formatName = (name) =>
    name
      .toLowerCase()
      .replace(/(^\w)|([-\s]\w)/g, (match) => match.toUpperCase())
      .replace(/(^|\. *)([a-z])/g, (match) => match.toUpperCase());

  const getBestValue = (values, preferredSurface) => {
    // Filtra los valores que coinciden con la superficie preferida.
    const matchingSurfaceValues = values.filter(
      (val) => val.surface === preferredSurface
    );

    // Usa los valores que coinciden si están disponibles; de lo contrario, usa todos los valores.
    const relevantValues =
      matchingSurfaceValues.length > 0 ? matchingSurfaceValues : values;

    // Encuentra el mejor valor de los relevantes.
    return relevantValues.reduce((max, obj) => {
      const valorActual = getFirstValue(obj.value);
      const maxValor = max ? getFirstValue(max.value) : 0; // Cambia null por 0 para la comparación.

      return valorActual > maxValor ? obj : max;
    }, null); // Empieza sin un valor máximo.
  };

  return (
    <table className={styles['quadrant-table']}>
      <thead>
        <tr>
          <th></th>
          <th>{data.racecourse}</th>
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
          {/* {data.horses.thisRaceData.some((elm) => elm === 'position') && <th></th>} */}
        </tr>
        <tr>
          <th className={styles['quadrant-table--number']}>Nº</th>
          <th className={styles['quadrant-table--horse']}>Caballo</th>
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
          <th>Anotaciones</th>
          {/* {data.horses.thisRaceData.some((elm) => elm === 'position') && <th>Pos</th>} */}
        </tr>
      </thead>
      <tbody>
        {data.horses
          .sort((a, b) => a.thisRaceData.number - b.thisRaceData.number)
          .map((elm, index) => (
            <tr key={`${elm.name}-${index}`}>
              <td>{elm.thisRaceData.number}</td>
              <td className={styles['quadrant-table--td-name']}>
                {formatName(elm.name)}
                {elm.thisRaceData.supplement && (
                  <span className={styles['quadrant-table--suppl']}>Suppl</span>
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
                          key={race._id}
                          id={race._id}
                          style={{
                            color:
                              race.surface === 'PSF' ? '#ff9900' : '#34a853',
                            textDecoration: race.mud ? 'underline' : 'none',
                            fontSize: '11px'
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
                    {elm.thisRaceData.weight - getMediumValue(elm.values)}
                  </span>
                )}
              </td>
              <td>
                {!elm.values.length ? (
                  ''
                ) : (
                  <span
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
                        : 'none'
                    }}
                  >
                    {elm.thisRaceData.weight -
                      getFirstValue(
                        (getBestValue(elm.values, data.surface) || {}).value ||
                          ''
                      )}
                  </span>
                )}
              </td>
              <td>
                {!elm.values.length ? (
                  ''
                ) : (
                  <span
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
                        : 'none'
                    }}
                  >
                    {elm.thisRaceData.weight -
                      getFirstValue(
                        (
                          getBestValue(elm.values.slice(-10), data.surface) ||
                          {}
                        ).value || ''
                      )}
                  </span>
                )}
              </td>
              <td>
                {!elm.values.length ? (
                  ''
                ) : (
                  <span
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
                        : 'none'
                    }}
                  >
                    {elm.thisRaceData.weight -
                      getFirstValue(
                        (getBestValue(elm.values.slice(-5), data.surface) || {})
                          .value || ''
                      )}
                  </span>
                )}
              </td>
              <td>
                {!elm.values.length ? (
                  ''
                ) : (
                  <span
                    style={{
                      color:
                        elm.values[elm.values.length - 1].surface === 'PSF'
                          ? '#ff9900'
                          : '#34a853',
                      textDecoration: elm.values[elm.values.length - 1].mud
                        ? 'underline'
                        : 'none'
                    }}
                  >
                    {elm.thisRaceData.weight -
                      getFirstValue(elm.values[elm.values.length - 1].value)}
                  </span>
                )}
              </td>
              <td></td>
              {/* {data.horses.thisRaceData.some((elm) => elm === 'position') && <td>Pos</td>} */}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default QuadrantTable;
