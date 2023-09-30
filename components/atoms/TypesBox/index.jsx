import React from 'react';

import styles from './TypesBox.module.scss';

const TypesBox = ({ type, setType }) => {
  const typesArr = [
    { type: 'month', name: 'Mes' },
    { type: 'racecourse', name: 'Hipódromo' },
    { type: 'stake', name: 'Stake' },
    { type: 'category', name: 'Categoría' }
  ];

  return (
    <div className={styles['types']}>
      <span>Tipos:</span>
      <div>
        {typesArr.map((elm, index) => (
          <span
            key={index}
            onClick={() => setType(elm.type)}
            className={`${
              type === elm.type || (!type && elm.type === 'month')
                ? styles['types--active']
                : ''
            }`}
          >
            {elm.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TypesBox;
