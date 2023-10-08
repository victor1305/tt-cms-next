import classNames from 'classnames';
import Link from 'next/link';

import { paymentsProfileHeaders } from '@/lib/constants';

import styles from './Payments.module.scss';

const PaymentsProfile = ({ payments }) => (
  <table className={styles['payments-table']}>
    <thead>
      <tr className={styles['payments-table--head-tr']}>
        {paymentsProfileHeaders.map((elm, index) => (
          <th key={index}>{elm}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {payments.map((item, index) => (
        <tr key={item._id}>
          <td>{index + 1}</td>
          <td className={styles['payments-table--td-name']}>
            <Link href={`/detalle-cliente/${item.clientId}`}>
              {item.client[0]}
            </Link>
          </td>
          <td>
            <div
              className={classNames(styles['payments-table__pay-status'], {
                'status-green': item.status === 'Pagado',
                'status-red': item.status === 'Impago',
                'status-orange': item.status === 'Pendiente'
              })}
            />
          </td>
          <td>{item.type === 'Paysafecard' ? 'PSC' : item.type}</td>
          <td>{item.price} €</td>
          <td>{item.information}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default PaymentsProfile;
