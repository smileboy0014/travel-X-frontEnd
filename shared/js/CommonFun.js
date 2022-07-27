import { func } from "prop-types";

// 날짜 포맷 변경(YYYY-MM-DD HH:mm:ss)
export function timestamp(date) {
  date.setHours(date.getHour() + 9);
  return date.toISOString().replace('T', ' ').substring(0, 19);
}

export function changeDateForm(date) {
  let dateArr;
  if (date != null) {
    dateArr = date.split('T');
    return dateArr[0]
  } else {
    return null;
  }
}

export function splitDateForm(date, type) {
  let dateArr;
  if (date != null && date !== '') {
    dateArr = date.split(':');
    return ((type == 'NIGHT' && !dateArr[0].includes('시부터')) ? dateArr[0] + '시부터' : date);
  } else {
    return '숙소문의';
  }
}

export function priceComma(price) {

  return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0';
};


