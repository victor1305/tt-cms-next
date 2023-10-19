import { BalancesTableRow, ClientTableRow } from '@/components/atoms';

import styles from './BalancesTable.module.scss';

const BalancesTable = ({
  headerArr,
  bodyArr,
  hasTotal = false,
  isClientTable = false
}) => {
  const totalProfit = bodyArr.reduce((acc, elm) => acc + elm.profit, 0);
  const profitColor =
    totalProfit < 0 ? '#f72c40' : totalProfit > 0 ? '#03f73c' : '#2e63f7';
  return (
    <table className={styles['table']}>
      <thead>
        <tr>
          {headerArr.map((elm, index) => (
            <th key={index}>{elm}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bodyArr.map((elm, index) =>
          isClientTable ? (
            <ClientTableRow key={index} data={elm} {...{ index }} />
          ) : (
            <BalancesTableRow key={index} data={elm} />
          )
        )}
        {hasTotal && (
          <tr className={styles['table__row-high']}>
            <td>Total</td>
            <td>{bodyArr.reduce((acc, elm) => acc + elm.deposits, 0).toFixed(2)}€</td>
            <td>{bodyArr.reduce((acc, elm) => acc + elm.withdraws, 0).toFixed(2)}€</td>
            <td style={{ color: profitColor, fontWeight: 'bold' }}>
              {totalProfit.toFixed(2)}€
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default BalancesTable;
