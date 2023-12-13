import styles from './PaymentsMonthResume.module.scss';

const PaymentsMonthResume = ({
  month,
  year,
  totalPayments,
  paymentsAntonio,
  paymentsEdu,
  paymentsVictor
}) => (
  <div className={styles['table-admins']}>
    <h4 className={styles['table-admins__title']}>
      Total recaudación {month} {year}: {totalPayments}€
    </h4>
    <h5 className={styles['table-admins__title']}>Reparto Pagos</h5>
    <table className={styles['table-admins__table']}>
      <thead>
        <tr className={styles['table-admins__table--tr']}>
          <th>Nombre</th>
          <th>Recibido</th>
          <th>Objetivo</th>
          <th>Diferencia</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Antonio</td>
          <td>{paymentsAntonio}</td>
          <td>{Math.round(totalPayments * 0.25)}</td>
          <td>
            {paymentsAntonio - totalPayments * 0.25 > 0 ? 'Sobran' : 'Faltan'}{' '}
            {Math.abs(Math.round(paymentsAntonio - totalPayments * 0.25))}€
          </td>
        </tr>
        <tr>
          <td>Eduardo</td>
          <td>{paymentsEdu}</td>
          <td>{Math.round(totalPayments * 0.45)}</td>
          <td>
            {paymentsEdu - totalPayments * 0.45 > 0 ? 'Sobran' : 'Faltan'}{' '}
            {Math.abs(Math.round(paymentsEdu - totalPayments * 0.45))}€
          </td>
        </tr>
        <tr>
          <td>Víctor</td>
          <td>{paymentsVictor}</td>
          <td>{Math.round(totalPayments * 0.3)}</td>
          <td>
            {paymentsVictor - totalPayments * 0.3 > 0 ? 'Sobran' : 'Faltan'}{' '}
            {Math.abs(Math.round(paymentsVictor - totalPayments * 0.3))}€
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default PaymentsMonthResume;
