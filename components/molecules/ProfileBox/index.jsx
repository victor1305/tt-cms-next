'use client';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './ProfileBox.module.scss';

const ProfileBox = ({
  text1,
  text2 = '',
  startDate,
  setStartDate,
  setIsFirstRender,
  children
}) => (
  <div>
    <h4 className={styles['box']}>
      {text1}
      {(text2.length > 0 || startDate) && (
        <span>
          {text2.length > 0 && text2}
          {startDate && setStartDate && (
            <DatePicker
              className="date-input"
              dateFormat="MM/yyyy"
              showMonthYearPicker
              showFullMonthYearPicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date), setIsFirstRender(false);
              }}
              showPopperArrow={false}
            />
          )}
        </span>
      )}
    </h4>
    {children}
  </div>
);

export default ProfileBox;
