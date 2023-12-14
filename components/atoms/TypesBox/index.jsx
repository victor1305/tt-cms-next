import React from 'react';

import styles from './TypesBox.module.scss';

const TypesBox = ({ type, setType, label, typesArr, defaultKey }) => (
  <div
    className={`${styles['types']} ${
      defaultKey === '00' ? styles['types--months'] : ''
    }`}
  >
    <span>{label}</span>
    <div
      className={`${styles['types__container']} ${
        defaultKey === '00' ? styles['types__container--months'] : ''
      }`}
    >
      {typesArr.map((elm, index) => (
        <span
          key={index}
          onClick={() => setType(elm.type)}
          className={`${styles['types__container__label']} ${
            type === elm.type || (!type && elm.type === defaultKey)
              ? styles['types--active']
              : ''
          } ${
            defaultKey === '00' ? styles['types__container__label--months'] : ''
          }`}
        >
          {elm.name}
        </span>
      ))}
    </div>
  </div>
);

export default TypesBox;
