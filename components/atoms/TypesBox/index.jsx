import React from 'react';

import styles from './TypesBox.module.scss';

const TypesBox = ({ type, setType }) => {
  const typesArr = ['month', 'category', 'racecourse', 'stake'];

  return (
    <div className={styles['types']}>
      <span>Tipos:</span>
      <div>
        {typesArr.map((elm, index) => (
          <span
            key={index}
            onClick={() => setType(elm)}
            className={`${
              type === elm.toString() ? styles['types--active'] : ''
            }`}
          >
            {elm}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TypesBox;
