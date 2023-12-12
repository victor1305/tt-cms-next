import Link from 'next/link';
import React from 'react';

import styles from './YearsBox.module.scss';

const YearsBox = ({ yearsArr, yearSelected }) => (
  <div className={styles['years']}>
    <span>Año:</span>
    <div>
      {yearsArr.map((elm, index) => (
        <Link
          key={index}
          href={`/stats/${elm}`}
          prefetch={false}
          className={`${
            yearSelected === elm.toString() ? styles['years--active'] : ''
          }`}
        >
          {elm}
        </Link>
      ))}
    </div>
  </div>
);

export default YearsBox;
