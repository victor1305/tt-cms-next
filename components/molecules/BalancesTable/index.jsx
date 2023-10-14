import { BalancesTableRow } from '@/components/atoms';

import styles from './BalancesTable.module.scss';

const BalancesTable = ({ headerArr, bodyArr }) => {
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
        {bodyArr.map((elm, index) => (
          <BalancesTableRow key={index} data={elm} />
        ))}
        <tr>
          <td>Total</td>
          <td>{bodyArr.reduce((acc, elm) => acc + elm.deposits, 0)}€</td>
          <td>{bodyArr.reduce((acc, elm) => acc + elm.withdraws, 0)}€</td>
          <td style={{ color: profitColor, fontWeight: 'bold' }}>
            {totalProfit.toFixed(2)}€
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BalancesTable;
