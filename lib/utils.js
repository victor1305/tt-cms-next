export const numberToMonth = (monthNumber) => {
  let month;

  if (monthNumber === 0) {
    month = 'Enero';
  } else if (monthNumber === 1) {
    month = 'Febrero';
  } else if (monthNumber === 2) {
    month = 'Marzo';
  } else if (monthNumber === 3) {
    month = 'Abril';
  } else if (monthNumber === 4) {
    month = 'Mayo';
  } else if (monthNumber === 5) {
    month = 'Junio';
  } else if (monthNumber === 6) {
    month = 'Julio';
  } else if (monthNumber === 7) {
    month = 'Agosto';
  } else if (monthNumber === 8) {
    month = 'Septiembre';
  } else if (monthNumber === 9) {
    month = 'Octubre';
  } else if (monthNumber === 10) {
    month = 'Noviembre';
  } else {
    month = 'Diciembre';
  }
  return month;
};

export const getMonthFormatted = (month) => {
  let monthFormated = month + 1;

  if (monthFormated < 10) monthFormated = `0${monthFormated}`;

  return monthFormated;
};
