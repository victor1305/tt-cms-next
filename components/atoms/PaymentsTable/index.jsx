import classNames from 'classnames';
import Link from 'next/link';
import { BsTrash3 } from 'react-icons/bs';
import { TbEdit } from 'react-icons/tb';

import { paymentsHeaders } from '@/lib/constants';

import styles from './Payments.module.scss';

const PaymentsTable = ({
  payments,
  isProfile = false,
  editClient,
  deleteClient
}) => (
  <table className={styles['payments-table']}>
    <thead>
      <tr className={styles['payments-table--head-tr']}>
        {paymentsHeaders.map((elm, index) => {
          if (!isProfile || (isProfile && elm !== 'Recibe' && elm !== '')) {
            return <th key={index}>{elm}</th>;
          }
        })}
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
          {!isProfile && <td>{item.beneficiary[0]}</td>}
          <td>{item.information}</td>
          {!isProfile && (
            <td onClick={() => editClient(item._id)}>
              <TbEdit color="#ffc107" size={18} />
            </td>
          )}
          {!isProfile && (
            <td onClick={() => deleteClient(item._id, item.client[0], item.beneficiaryId[0], item.clientId[0])}>
              <BsTrash3 color="#ff0000" />
            </td>
          )}
        </tr>
      ))}
    </tbody>
  </table>
);

export default PaymentsTable;
