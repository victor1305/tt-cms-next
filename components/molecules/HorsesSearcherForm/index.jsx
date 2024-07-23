'use client';

import styles from './HorsesSearcherForm.module.scss';

const HorsesSearcherForm = ({ setHorseData, horseData, searchHorse }) => (
  <div className={styles['horses-searcher-form']}>
    <div>
      <label>Nombre del caballo:</label>
      <input
        type="text"
        name="horseName"
        value={horseData.horseName}
        onChange={(e) =>
          setHorseData({ ...horseData, horseName: e.target.value })
        }
      />
    </div>
    <div>
      <label>Edad: </label>
      <input
        type="number"
        name="horseAge"
        value={horseData.horseName}
        onChange={(e) =>
          setHorseData({ ...horseData, horseAge: e.target.value })
        }
      />
    </div>
    <div>
      <button
        className="form-btn form-btn--primary"
        onClick={searchHorse}
        disabled={!horseData.horseName.length}
      >
        Buscar
      </button>
    </div>
  </div>
);

export default HorsesSearcherForm;
