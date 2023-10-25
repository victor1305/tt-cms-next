import DotLoader from 'react-spinners/DotLoader';

import { PaymentsTable, PaymentsResume } from '@/components/atoms';

import styles from './PaymentsBox.module.scss';

const PaymentsBox = ({ payments, monthPayments, yearPayments, isLoading }) => (
  <>
    {isLoading ? (
      <div className="spinner-container">
        <DotLoader color={'#3860fb'} loading={isLoading} size={90} />
      </div>
    ) : (
      <div>
        {payments.length ? (
          <div className={styles['payments-box__payments']}>
            <PaymentsTable payments={payments} isProfile={true} />
            <PaymentsResume payments={payments} />
          </div>
        ) : (
          <p className={styles['payments-box__no-payments']}>
            No hay pagos que mostrar para {`${monthPayments}-${yearPayments}`}
          </p>
        )}
      </div>
    )}
  </>
);

export default PaymentsBox;
