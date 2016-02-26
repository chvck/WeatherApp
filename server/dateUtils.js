var weekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

export function getWeekdayName(date) {
    let numericalDay = date.getDay();

    return weekday[numericalDay];
}

export function historicalDate(date, historicalDay) {
    let historicalDate = date.setDate(date.getDate() - historicalDay);
    return date;
}
