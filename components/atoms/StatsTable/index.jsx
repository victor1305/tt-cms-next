import classNames from 'classnames';

import styles from './StatsTable.module.scss';

const StatsTable = ({ bets, tableHeader, statsType, arrKeys, type }) => (
  <table className={styles['table-stats']}>
    <thead>
      <tr>
        {tableHeader.map((elm, index) => {
          if (elm === 'Aciertos' || elm === 'Fallos' || elm === 'Nulos') {
            return (
              <th
                key={`header-${index}`}
                className={styles['table-stats__bet--hide-mobile']}
              >
                <div
                  className={classNames(styles['table-stats__bet'], {
                    [styles['table-stats__bet--win']]: elm === 'Aciertos',
                    [styles['table-stats__bet--void']]: elm === 'Nulos',
                    [styles['table-stats__bet--loss']]: elm === 'Fallos'
                  })}
                ></div>
              </th>
            );
          } else {
            return (
              <th
                key={`header-${index}`}
                className={classNames({
                  [styles['table-stats__bet--hide']]:
                    statsType === 'Stakes' && elm === 'Stake Medio',
                  [styles['table-stats__bet--hide-mobile']]: !(
                    elm === statsType ||
                    elm === 'Acierto' ||
                    elm === 'Yield' ||
                    elm === 'Profit'
                  )
                })}
              >
                {elm}
              </th>
            );
          }
        })}
      </tr>
    </thead>
    <tbody>
      {bets.map((item, index) => (
        <tr key={index}>
          {arrKeys.map((itemKey, keyIndex) => {
            return (
              <td
                id={`body-${index}-${keyIndex}`}
                key={`body-${index}-${keyIndex}`}
                className={classNames({
                  [styles['table-stats__bet--hide']]:
                    statsType === 'Stakes' && itemKey === 'medium_stake',
                  [styles['table-stats__bet--hide-mobile']]: !(
                    itemKey === 'yield' ||
                    itemKey === 'profit' ||
                    itemKey === 'win_percent' ||
                    itemKey === arrKeys[0]
                  ),
                  [styles['table-stats--align-left']]: itemKey === type,
                  [styles['table-stats__result']]:
                    itemKey === 'yield' || itemKey === 'profit',
                  [styles['table-stats__result--win']]:
                    (itemKey === 'yield' || itemKey === 'profit') &&
                    item[itemKey] > 0,
                  [styles['table-stats__result--loss']]:
                    (itemKey === 'yield' || itemKey === 'profit') &&
                    item[itemKey] < 0,
                  [styles['table-stats__result--void']]:
                    (itemKey === 'yield' || itemKey === 'profit') &&
                    (item[itemKey] === '0.00' || item[itemKey] === 'NaN')
                })}
              >
                {(itemKey === 'win_percent' || itemKey === 'yield') &&
                item[itemKey] !== 'NaN'
                  ? `${item[itemKey]}%`
                  : itemKey === 'medium_stake' && item[itemKey] === 'NaN'
                  ? '0.00'
                  : (itemKey === 'win_percent' || itemKey === 'yield') &&
                    item[itemKey] === 'NaN'
                  ? 'N/A'
                  : item[itemKey]}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
);

export default StatsTable;
