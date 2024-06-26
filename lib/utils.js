import { dayPlannerMapping } from './constants';

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

export const getDayFormatted = (day) => {
  let dayFormatted = day;

  if (dayFormatted < 10) dayFormatted = `0${dayFormatted}`;

  return dayFormatted;
};

export const formatName = (name) =>
  !name
    ? ''
    : name
        .toLowerCase()
        .replace(/(^\w)|([-\s]\w)/g, (match) => match.toUpperCase())
        .replace(/(^|\. *)([a-z])/g, (match) => match.toUpperCase());

export const isoDatetoddmmyyyy = (isoDate) => {
  const date = new Date(isoDate);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const getDateFormatted = (year, month, day) => {
  const monthFormatted = month < 10 ? `0${month}` : month;
  const dayFormatted = day < 10 ? `0${day}` : day;

  return `${year}-${monthFormatted}-${dayFormatted}`;
};

export const calculateNumberDaysOnMonthForTable = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dateFormated = `${year}-${getMonthFormatted(
    date.getMonth()
  )}-01 05:00:22`;
  const beginingDay = new Date(dateFormated).getDay();
  const day = dayPlannerMapping[beginingDay];

  return calculateNumberDaysOnMonth(year, month, day);
};

export const calculateNumberDaysOnMonth = (year, month, day) => {
  const monthNumberDays = new Date(year, month, 0).getDate();
  const monthByDays = [];
  for (let i = day; i <= monthNumberDays; i++) {
    monthByDays.push(i);
  }

  return monthByDays;
};

export const getDataFormatted = (data, date) => {
  const year = date.getFullYear();
  const arrayDays = [];
  const month = date.getMonth() + 1;
  const dateFormated = `${year}-${getMonthFormatted(
    date.getMonth()
  )}-01 05:00:22`;
  const beginingDay = new Date(dateFormated).getDay();
  const day = dayPlannerMapping[beginingDay];

  for (
    let i = 1;
    i <= calculateNumberDaysOnMonth(year, month, day).length;
    i++
  ) {
    const dayData = data.filter(
      (elm) =>
        new Date(elm.date) >
          new Date(`${getDateFormatted(year, month, i)}T00:00:00.951+00:00`) &&
        new Date(elm.date) <
          new Date(`${getDateFormatted(year, month, i)}T23:59:59.951+00:00`)
    );
    arrayDays.push(dayData);
  }
  return {
    dataByDay: arrayDays,
    monthDays: calculateNumberDaysOnMonth(year, month, day)
  };
};

export const updateDate = (e = new Date()) => {
  const date = new Date(e);
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  date.setHours(hour);
  date.setMinutes(minute);
  date.setSeconds(second);

  return date;
};

export const getCorde = (corde) =>
  !corde
    ? ''
    : corde.includes('GAUCHE')
    ? 'I'
    : corde.includes('CORDE_DROITE')
    ? 'D'
    : corde.includes('LIGNE')
    ? 'L.R.'
    : '';

export const getTerrainType = (elm) =>
  !elm.surface
    ? ''
    : elm.surface.toUpperCase() === 'PSF'
    ? 'PSF'
    : elm.measurement
    ? elm.measurement
    : elm.mud
    ? 'Barro'
    : elm.surface.toUpperCase() === 'HIERBA'
    ? 'Hierba'
    : '';

export const getRaceType = (raceType) =>
  !raceType
    ? ''
    : raceType.toUpperCase().includes('INCON')
    ? ''
    : raceType.toUpperCase().includes('RECL')
    ? 'Rec'
    : raceType.toUpperCase().includes('HAND')
    ? 'Hand'
    : 'Cond';

export const traductGenre = (genre) =>
  !genre
    ? ''
    : genre.toUpperCase().includes('MAL')
    ? 'Caballo'
    : genre.toUpperCase().includes('FEM')
    ? 'Yegua'
    : 'Castrado';

export const getTypeTraduction = (type) =>
  !type || type === 'month'
    ? 'Mes'
    : type === 'category'
    ? 'Categoría'
    : type === 'stake'
    ? 'Stake'
    : 'Hipódromo';

export const getTableHeader = (typeTraduction) => [
  typeTraduction,
  'Apuestas',
  'Aciertos',
  'Fallos',
  'Nulos',
  'Acierto',
  'Stake Medio',
  'Uds Jugadas',
  'Yield',
  'Profit'
];

export const getArrKeys = (type) => [
  !type ? 'month' : type,
  'bets',
  'wins',
  'loss',
  'voids',
  'win_percent',
  'medium_stake',
  'units_staked',
  'yield',
  'profit'
];

export const setTerrainColor = (terrain) =>
  terrain.toLowerCase().includes('bon') || terrain.toLowerCase().includes('hierba')
    ? '#4CBB17'
    : terrain.toLowerCase().includes('souple')
    ? '#889859'
    : terrain.toLowerCase().includes('psf')
    ? '#ff9900'
    : '#053B28';
