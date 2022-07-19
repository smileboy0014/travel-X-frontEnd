// 날짜 포맷 변경(YYYY-MM-DD HH:mm:ss)
export function timestamp(date){
  date.setHours(date.getHour()+9);
  return date.toISOString().replace('T',' ').substring(0,19);
}

export function changeDateForm(date){
  let dateArr;
  if (date != null) {
    dateArr = date.split('T');
    return dateArr[0]
  } else {
    return null;
  }
}

