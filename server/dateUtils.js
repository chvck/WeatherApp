var weekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export function getWeekdayName(date) {
    let numericalDay = date.getDay();

    return weekday[numericalDay];
}

export function getHistoricalAbsoluteDay(today, historicalDay) {
    let date = new Date(today.getFullYear(), today.getDay(), today.getMonth());
    let absoluteDate = date.setDate(date.getDate() - historicalDay);

    return absoluteDate;
}

export function historicalDate(date, historicalDay) {
    let historicalDate = date.setDate(date.getDate() - historicalDay);
    return date;
}
