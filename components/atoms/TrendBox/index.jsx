import { PulseLoader } from 'react-spinners';

import styles from './TrendBox.module.scss';

const TrendBox = ({ copy, balance, isLoading = false }) => (
  <p className={styles['trend-box']}>
    {copy}
    {isLoading ? (
      <span className={styles['trend-box--loader']}>
        <PulseLoader color={'#3860fb'} loading={isLoading} />
      </span>
    ) : (
      <span
        className={
          !balance
            ? styles['trend-box--blue']
            : balance > 0
            ? styles['trend-box--green']
            : styles['trend-box--red']
        }
      >
        {balance} Uds
      </span>
    )}
  </p>
);

export default TrendBox;
